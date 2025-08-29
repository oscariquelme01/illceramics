import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { headers } from 'next/headers'
import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'
import { z } from 'zod'
import { db } from '@/database'
import { products } from '@/database/schema'
import { eq, sql } from 'drizzle-orm'

// AWS S3 Client
const s3 = new S3Client({
	region: process.env.AWS_REGION,
	credentials: {
		accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
	}
})

// Validation schemas
const uploadSchema = z.object({
	filetypes: z.array(z.string().min(1)),
	productId: z.uuid() // the frontend generates the uuid for the product, not ideal but works since we are authenticated as admin
})

const deleteSchema = z.object({
	imageKey: z.string().min(1),
	productId: z.uuid()
})

export async function POST(req: Request) {
	const session = await auth.api.getSession({
		query: { disableCookieCache: true },
		headers: await headers()
	})

	if (!session || !session?.user.role?.includes('admin')) {
		return NextResponse.json({ message: 'You must be logged in as an admin before uploading anything' }, { status: 403 })
	}

	const body = await req.json()
	const parsed = uploadSchema.safeParse(body)

	if (!parsed.success) {
		return NextResponse.json({ error: parsed.error }, { status: 400 })
	}

	const { filetypes, productId } = parsed.data

	// Generate signed URLs for each file
	const uploads = await Promise.all(
		filetypes.map(async filetype => {
			const key = `products/${productId}/${crypto.randomUUID()}`
			const command = new PutObjectCommand({
				Bucket: process.env.S3_BUCKET_NAME!,
				Key: key,
				ContentType: filetype
			})
			const uploadUrl = await getSignedUrl(s3, command, { expiresIn: 300 })
			return { uploadUrl, key }
		})
	)

	return NextResponse.json({ uploads })
}

export async function GET(req: Request) {
	try {
		const { searchParams } = new URL(req.url)
		const imageKey = searchParams.get('imageKey')

		// Validate required parameters
		if (!imageKey) {
			return NextResponse.json({ error: 'imageKey parameter is required' }, { status: 400 })
		}

		// Create the GetObjectCommand
		const command = new GetObjectCommand({
			Bucket: process.env.S3_BUCKET_NAME!,
			Key: imageKey
		})

		// Generate signed URL
		const signedUrl = await getSignedUrl(s3, command, {
			expiresIn: 3600 // 1 hour in seconds
		})

		return NextResponse.json({
			url: signedUrl, // Changed from signedUrl to url for consistency with your dropzone
			status: 200
		})
	} catch (error) {
		console.error('Error generating signed URL:', error)
		return NextResponse.json({ error: 'Failed to generate signed URL' }, { status: 500 })
	}
}

export async function DELETE(req: Request) {
	try {
		// Check authentication and authorization
		const session = await auth.api.getSession({
			query: { disableCookieCache: true },
			headers: await headers()
		})

		if (!session || !session?.user.role?.includes('admin')) {
			return NextResponse.json({ message: 'You must be logged in as an admin to delete images' }, { status: 403 })
		}

		// Parse request body
		const body = await req.json()
		const parsed = deleteSchema.safeParse(body)

		if (!parsed.success) {
			return NextResponse.json({ error: 'Invalid request data', details: parsed.error }, { status: 400 })
		}

		const { imageKey, productId } = parsed.data

		// Create the DeleteObjectCommand
		const command = new DeleteObjectCommand({
			Bucket: process.env.S3_BUCKET_NAME!,
			Key: imageKey
		})

		// Execute the delete operation
		await s3.send(command)

		await db
			.update(products)
			.set({
				images: sql`(
      SELECT jsonb_agg(elem)
      FROM jsonb_array_elements_text(${products.images}) elem
      WHERE elem <> ${imageKey}
    )`
			})
			.where(eq(products.id, productId))

		return NextResponse.json({
			message: 'Image deleted successfully',
			imageKey,
			status: 200
		})
	} catch (error) {
		console.error('Error deleting image from S3:', error)
		return NextResponse.json({ error: 'Failed to delete image' }, { status: 500 })
	}
}

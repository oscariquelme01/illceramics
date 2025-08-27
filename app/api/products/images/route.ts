import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { headers } from 'next/headers'
import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'
import { z } from 'zod'

// AWS S3 Client
const s3 = new S3Client({
	region: process.env.AWS_REGION,
	credentials: {
		accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
	}
})

// Validation schema
const uploadSchema = z.object({
	filetypes: z.array(z.string().min(1)),
	productId: z.uuid().optional() // if you want to link uploads to an existing product
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

	// If no productId passed, generate one (useful when uploading before product creation)
	const id = productId ?? crypto.randomUUID()

	// Generate signed URLs for each file
	const uploads = await Promise.all(
		filetypes.map(async filetype => {
			const key = `products/${id}/${crypto.randomUUID()}`

			const command = new PutObjectCommand({
				Bucket: process.env.S3_BUCKET_NAME!,
				Key: key,
				ContentType: filetype
			})

			const uploadUrl = await getSignedUrl(s3, command, { expiresIn: 300 })
			return { uploadUrl, key }
		})
	)

	return NextResponse.json({ productId: id, uploads })
}

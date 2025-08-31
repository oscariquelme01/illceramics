import { headers } from 'next/headers'
import { auth } from '@/lib/auth'
import { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { db } from '@/database'
import { products } from '@/database/schema'
import { z } from 'zod'
import { eq } from 'drizzle-orm'

// Zod schema for request validation
const createProductSchema = z.object({
	id: z.uuid(),
	name: z.string().min(1, { message: 'El nombre no puede estar vacío' }),
	description: z.string().min(1, { message: 'La descripción no puede estar vacía' }),
	// numeric in DB → stored as string, but validate as number
	price: z.preprocess(
		val => (typeof val === 'string' ? val.trim() : val),
		z.string().refine(val => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
			message: 'El precio debe ser un número válido mayor a 0'
		})
	),
	// DB expects string[]
	colors: z.array(z.string()).min(1, { message: 'Debe seleccionar al menos un color' }),
	// DB expects string[]
	materials: z.string().min(1, { message: 'Debe incluir al menos un material' }),
	// DB expects integer
	weight: z.preprocess(
		val => (typeof val === 'string' ? parseInt(val, 10) : val),
		z.number().positive({ message: 'El peso debe ser un número válido mayor a 0' })
	),
	// DB expects object { length, width, height }
	dimensions: z.object({
		length: z.preprocess(
			val => (typeof val === 'string' ? parseFloat(val) : val),
			z.number().positive({ message: 'La longitud debe ser un número válido mayor a 0' })
		),
		width: z.preprocess(
			val => (typeof val === 'string' ? parseFloat(val) : val),
			z.number().positive({ message: 'El ancho debe ser un número válido mayor a 0' })
		),
		height: z.preprocess(
			val => (typeof val === 'string' ? parseFloat(val) : val),
			z.number().positive({ message: 'La altura debe ser un número válido mayor a 0' })
		)
	}),

	images: z.array(z.string()),

	// category can be empty string for now
	category: z.string().optional()
})

const deleteProductSchema = z.object({
	productId: z.uuid()
})

export async function POST(req: NextRequest) {
	try {
		// Auth check
		const session = await auth.api.getSession({
			query: {
				disableCookieCache: true
			},
			headers: await headers()
		})

		if (!session || !session?.user.role?.includes('admin')) {
			return NextResponse.json(
				{
					error: 'You must be logged in as an admin before creating a product',
					status: 403
				},
				{ status: 403 }
			)
		}

		// Parse and validate request body
		const body = await req.json()

		// Validate with Zod
		const validationResult = createProductSchema.safeParse(body)

		if (!validationResult.success) {
			return NextResponse.json(
				{
					error: 'Validation failed',
					details: validationResult.error,
					status: 400
				},
				{ status: 400 }
			)
		}

		const validatedData = validationResult.data

		// Check if the product already exists
		const productId = validatedData.id
		const product = await db.query.products.findFirst({
			where: eq(products.id, productId)
		})

		// product already exists, update the values!
		if (product) {
			await db
				.update(products)
				.set({
					id: productId,
					name: validatedData.name,
					description: validatedData.description,
					price: validatedData.price,
					currency: 'EUR',
					colors: validatedData.colors,
					materials: validatedData.materials,
					weight: validatedData.weight, // Always in grams
					dimensions: validatedData.dimensions,
					images: product.images?.concat(validatedData.images),
					category: '' // For the time being category is empty
				})
				.where(eq(products.id, productId))

			return NextResponse.json({
				status: 200,
				message: 'Product updated correctly'
			})
		}
		// new product, create it!
		else {
			// Insert into database
			const newProduct = await db
				.insert(products)
				.values({
					id: productId,
					name: validatedData.name,
					description: validatedData.description,
					price: validatedData.price,
					currency: 'EUR',
					colors: validatedData.colors,
					materials: validatedData.materials,
					weight: validatedData.weight, // Always in grams
					dimensions: validatedData.dimensions,
					images: validatedData.images,
					category: '' // For the time being category is empty
				})
				.returning()

			return NextResponse.json(
				{
					product: newProduct[0], // returning() gives an array
					status: 200,
					message: 'Product created successfully'
				},
				{ status: 200 }
			)
		}
	} catch (error) {
		console.error('Error creating product:', error)

		return NextResponse.json(
			{
				error: 'Internal server error',
				status: 500
			},
			{ status: 500 }
		)
	}
}

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url)
	const productId = searchParams.get('productId')

	// no product id specified -> return all products
	if (!productId) {
		const allProducts = await db.select().from(products)
		return NextResponse.json({ status: 200, products: allProducts })
	}

	const productDetails = await db.select().from(products).where(eq(products.id, productId))

	return NextResponse.json({ status: 200, productDetails })
}

export async function DELETE(req: Request) {
	try {
		// Check authentication and authorization
		const session = await auth.api.getSession({
			query: { disableCookieCache: true },
			headers: await headers()
		})

		if (!session || !session?.user.role?.includes('admin')) {
			return NextResponse.json({ message: 'You must be logged in as an admin to delete products' }, { status: 403 })
		}

		// Parse request body
		const body = await req.json()
		const parsed = deleteProductSchema.safeParse(body)

		if (!parsed.success) {
			return NextResponse.json({ error: 'Invalid request data', details: parsed.error }, { status: 400 })
		}

		const { productId } = parsed.data

		await db.delete(products).where(eq(products.id, productId))

		return NextResponse.json({
			message: 'Product deleted successfully',
			status: 200
		})
	} catch (error) {
		console.error('Error deleting the product from the DB:', error)
		return NextResponse.json({ error: 'Failed to delete image' }, { status: 500 })
	}
}

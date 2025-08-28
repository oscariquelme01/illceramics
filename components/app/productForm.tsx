'use client'

import * as React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/shadcn-io/spinner'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { Product } from '@/database/schema'
import { ColorPicker } from './colorPicker'
import Dropzone from './dropzone'
import { DimensionField } from './dimensionsField'

const formSchema = z.object({
	name: z.string().min(1, { error: 'El nombre no puede estar vacio' }),
	description: z.string().min(1, { error: 'La descripción del producto no puede estar vacia' }),
	materials: z.string().min(1, { error: 'Los materiales no pueden estar vacios' }),
	dimensions: z.object({
		width: z
			.string()
			.min(1, 'Introduce un ancho válido')
			.refine(val => !isNaN(parseFloat(val)), {
				message: 'Debe ser un número válido'
			}),
		height: z
			.string()
			.min(1, 'Introduce un largo válido')
			.refine(val => !isNaN(parseFloat(val)), {
				message: 'Debe ser un número válido'
			}),
		length: z
			.string()
			.min(1, 'Introduce un alto válido')
			.refine(val => !isNaN(parseFloat(val)), {
				message: 'Debe ser un número válido'
			})
	}),
	images: z.array(z.instanceof(File)).min(1, 'Por favor sube al menos una imagen').max(5, 'Máximo 5 imágenes permitidas'),
	weight: z
		.string()
		.min(1, 'Introduce un peso válido')
		.refine(val => !isNaN(parseFloat(val)), {
			message: 'Debe ser un número válido'
		}),
	price: z
		.string()
		.min(1, 'Introduce un precio válido')
		.refine(val => !isNaN(parseFloat(val)), {
			message: 'Debe ser un número válido'
		}),
	colors: z.array(z.string()).min(1, { error: 'Introduce al menos un color' })
})

export type FormValues = z.infer<typeof formSchema>

// Return the default values for the form depending on whether the product already exists or not
const getDefaultFormValues = (details: Product) => {
	const defaultValues: FormValues = {
		name: '',
		description: '',
		materials: '',
		dimensions: { width: '', height: '', length: '' },
		price: '',
		weight: '',
		images: [],
		colors: []
	}

	if (details) {
		defaultValues.name = details.name || ''
		defaultValues.description = details.description || ''
		defaultValues.materials = details.materials || ''

		defaultValues.dimensions.length = details.dimensions?.length.toString() || ''
		defaultValues.dimensions.height = details.dimensions?.height.toString() || ''
		defaultValues.dimensions.width = details.dimensions?.width.toString() || ''

		defaultValues.price = details.price || ''
		defaultValues.weight = details.weight?.toString() || ''
		defaultValues.colors = details.colors || []
	}

	return defaultValues
}

const ProductForm: React.FC<{ details?: Product }> = ({ details }) => {
	const [loading, setLoading] = React.useState(false)
	const [weightUnit, setWeightUnit] = React.useState<'kg' | 'g'>('kg')

	const onSubmit = async (data: FormValues) => {
		setLoading(true)

		// create array of filetypes for the endpoint
		const filetypes: Array<string> = []
		const images = form.getValues('images')
		for (const image of images) {
			filetypes.push(image.type)
		}

		// get the signed urls from the server to upload the images
		const response = await fetch('/api/products/images', {
			method: 'POST',
			body: JSON.stringify({
				filetypes: filetypes,
				productId: crypto.randomUUID()
			})
		})

		const { uploads, productId } = (await response.json()) as { productId: string; uploads: Array<{ uploadUrl: string }> }

		// upload each file using the signed URLs
		const uploadPromises = data.images.map(async (file, index) => {
			const uploadUrl = uploads[index].uploadUrl

			return fetch(uploadUrl, {
				method: 'PUT',
				body: file,
				headers: {
					'Content-Type': file.type
				}
			})
		})
		await Promise.all(uploadPromises)
		toast.success('Imágenes subidas correctamente')

		const finalWeight = weightUnit === 'kg' ? 1000 * parseFloat(data.weight) : parseFloat(data.weight)

		const createProductResponse = await fetch('/api/products', {
			method: 'POST',
			body: JSON.stringify({
				...data,
				id: productId,
				weight: finalWeight,
				images: []
			})
		})
		setLoading(false)

		if (createProductResponse.ok) toast.success('Producto creado correctamente')
		else toast.error(`Error creando el producto: ${await createProductResponse.json()}`)
	}

	const defaultValues = getDefaultFormValues(details!)
	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: defaultValues
	})

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-xl space-y-6">
				{/* Product name */}
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Nombre del producto</FormLabel>
							<FormControl>
								<Input placeholder="Pendientes de Arcilla Redondos" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Description */}
				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Descripcion</FormLabel>
							<FormControl>
								<Textarea placeholder="Nuestros pendientes artesanos de arcilla rendondos ideales para..." {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="flex items-start justify-between gap-4">
					{/* Product Weight */}
					<FormField
						control={form.control}
						name="weight"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Peso del producto</FormLabel>
								<FormControl>
									<div className="flex">
										<Input type="number" step="0.01" min="0" placeholder="1.5" {...field} className="rounded-r-none border-r-0" />
										<select
											value={weightUnit}
											onChange={e => setWeightUnit(e.target.value as 'kg' | 'g')}
											className="bg-muted flex cursor-pointer items-center rounded-r-md border border-l-0 px-3 text-sm outline-none"
										>
											<option value="kg">kg</option>
											<option value="g">g</option>
										</select>
									</div>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* Price */}
					<FormField
						control={form.control}
						name="price"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Precio</FormLabel>
								<FormControl>
									<div className="flex items-center border-r">
										<Input type="" step="0.01" min="0" placeholder="1.5" {...field} className="rounded-r-none border-r-0" />
										<span className="px-2">€</span>
									</div>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				{/* Materials */}
				<FormField
					control={form.control}
					name="materials"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Materiales</FormLabel>
							<FormControl>
								<Input placeholder="Cerámica, acero inoxidable..." {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<DimensionField form={form} name="dimensions" />

				<ColorPicker form={form} name="colors" />

				<Dropzone form={form} name="images" />

				<Button type="submit" className="w-full" disabled={loading}>
					{loading ? <Spinner /> : details ? 'Guardar cambios' : 'Crear producto'}
				</Button>
			</form>
		</Form>
	)
}

export default ProductForm

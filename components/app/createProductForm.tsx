'use client'

import * as React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/shadcn-io/spinner'
import { ImagePlus, X } from 'lucide-react'
import { useDropzone } from 'react-dropzone'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'

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
	colors: z.array(z.string()).length(1, { error: 'Introduce al menos un color' })
})

export type FormValues = z.infer<typeof formSchema>

const CreateProductForm = () => {
	const [loading, setLoading] = React.useState(false)
	const [previews, setPreviews] = React.useState<string[]>([])
	const [currentColor, setCurrentColor] = React.useState('#000000')
	const [weightUnit, setWeightUnit] = React.useState('kg')

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

		const createProductResponse = await fetch('/api/products', {
			method: 'POST',
			body: JSON.stringify({
				id: productId,
				...data
			})
		})

		console.log(await createProductResponse.json())

		setLoading(false)
	}

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
			description: '',
			materials: '',
			dimensions: { width: '', height: '', length: '' },
			price: '',
			weight: '',
			images: [],
			colors: []
		}
	})

	const currentImages = form.watch('images') || []

	// On drop callback launched when the user drops an image
	const onDrop = React.useCallback(
		(acceptedFiles: File[]) => {
			const currentFiles = form.getValues('images') || []
			const newFiles = [...currentFiles, ...acceptedFiles].slice(0, 5) // Limit to 5 images

			// Create previews for new files
			const newPreviews: string[] = []
			acceptedFiles.forEach(file => {
				const reader = new FileReader()
				reader.onload = () => {
					if (typeof reader.result === 'string') {
						newPreviews.push(reader.result)
						if (newPreviews.length === acceptedFiles.length) {
							setPreviews(prev => [...prev, ...newPreviews].slice(0, 5))
						}
					}
				}
				reader.readAsDataURL(file)
			})

			form.setValue('images', newFiles)
			form.clearErrors('images')
		},
		[form]
	)

	const removeImage = (index: number) => {
		const currentFiles = form.getValues('images') || []
		const newFiles = currentFiles.filter((_, i) => i !== index)
		const newPreviews = previews.filter((_, i) => i !== index)

		form.setValue('images', newFiles)
		setPreviews(newPreviews)

		if (newFiles.length === 0) {
			form.trigger('images')
		}
	}

	const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
		onDrop,
		maxFiles: 5 - currentImages.length, // Limit based on current images
		maxSize: 1000000, // 1MB
		accept: { 'image/png': [], 'image/jpg': [], 'image/jpeg': [] },
		disabled: currentImages.length >= 5
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

				<div className="flex items-start gap-4">
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
											onChange={e => setWeightUnit(e.target.value)}
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

				{/* Dimensions */}
				<FormField
					control={form.control}
					name="dimensions"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Dimensiones</FormLabel>
							<FormControl>
								<div className="grid grid-cols-3 gap-2">
									<span className="text-sm">Ancho</span>
									<span className="text-sm">Largo</span>
									<span className="text-sm">Alto</span>
									<Input
										type="number"
										placeholder="Ancho (cm)"
										value={field.value?.width || ''}
										onChange={e => field.onChange({ ...field.value, width: e.target.value })}
									/>
									<Input
										type="number"
										placeholder="Largo (cm)"
										value={field.value?.length || ''}
										onChange={e => field.onChange({ ...field.value, length: e.target.value })}
									/>
									<Input
										type="number"
										placeholder="Alto (cm)"
										value={field.value?.height || ''}
										onChange={e => field.onChange({ ...field.value, height: e.target.value })}
									/>
								</div>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Multi-Color picker */}
				<FormField
					control={form.control}
					name="colors"
					render={({ field }) => {
						const colors = field.value || []

						const addColor = () => {
							if (!colors.includes(currentColor)) {
								const newColors = [...colors, currentColor]
								field.onChange(newColors)
							}
						}

						const removeColor = (colorToRemove: string) => {
							const newColors = colors.filter(color => color !== colorToRemove)
							field.onChange(newColors)
						}

						return (
							<FormItem>
								<FormLabel>Colores disponibles</FormLabel>
								<FormControl>
									<div className="space-y-3">
										{/* Color input section */}
										<div className="flex items-center gap-2">
											<input
												type="color"
												value={currentColor}
												onChange={e => setCurrentColor(e.target.value)}
												className="m-0 h-8 w-8 cursor-pointer !border-0 p-0 outline-none focus:border-none focus:outline-none"
											/>
											<Button
												type="button"
												onClick={addColor}
												size="sm"
												disabled={colors.includes(currentColor)}
												className="flex-shrink-0"
											>
												Añadir color
											</Button>
										</div>

										{/* Selected colors display */}
										{colors.length > 0 && (
											<div className="space-y-2">
												<p className="text-sm font-medium">Colores seleccionados:</p>
												<div className="flex flex-wrap gap-2">
													{colors.map(color => (
														<div
															key={color}
															className="bg-background-primary-200 flex items-center gap-2 rounded-lg border px-3 py-2"
														>
															<div className="h-6 w-6 rounded-full" style={{ backgroundColor: color }} />
															<button
																type="button"
																onClick={() => removeColor(color)}
																className="ml-1 text-red-500 transition-colors hover:text-red-700"
															>
																<X size={14} />
															</button>
														</div>
													))}
												</div>
											</div>
										)}
									</div>
								</FormControl>
								<FormMessage />
							</FormItem>
						)
					}}
				/>
				{/* Multiple Images */}
				<FormField
					control={form.control}
					name="images"
					render={() => (
						<FormItem>
							<FormLabel className={`${fileRejections.length !== 0 && 'text-destructive'}`}>
								<h2 className="text-xl font-semibold tracking-tight">
									Subir imágenes ({currentImages.length}/5)
									<span className="text-muted-foreground block text-sm">Puedes subir hasta 5 imágenes</span>
								</h2>
							</FormLabel>

							{/* Image Previews */}
							{previews.length > 0 && (
								<div className="mb-4 grid grid-cols-2 gap-4 md:grid-cols-3">
									{previews.map((preview, index) => (
										<div key={index} className="group relative">
											<img src={preview} alt={`Preview ${index + 1}`} className="h-32 w-full rounded-lg border object-cover" />
											<button
												type="button"
												onClick={() => removeImage(index)}
												className="bg-destructive text-destructive-foreground absolute -top-2 -right-2 rounded-full p-1 opacity-0 transition-opacity group-hover:opacity-100"
											>
												<X size={16} />
											</button>
										</div>
									))}
								</div>
							)}

							{/* Dropzone */}
							{currentImages.length < 5 && (
								<FormControl>
									<div
										{...getRootProps()}
										className="border-foreground/20 hover:border-foreground/40 mx-auto flex cursor-pointer flex-col items-center justify-center gap-y-2 rounded-lg border-2 border-dashed p-8 transition-colors"
									>
										<ImagePlus className="text-muted-foreground size-16" />
										<Input {...getInputProps()} type="file" multiple />
										{isDragActive ? (
											<p className="text-center">¡Suelta las imágenes aquí!</p>
										) : (
											<div className="text-center">
												<p>Haz clic aquí o arrastra imágenes para subirlas</p>
												<p className="text-muted-foreground text-sm">PNG, JPG o JPEG (máx. 1MB cada una)</p>
											</div>
										)}
									</div>
								</FormControl>
							)}

							<FormMessage>
								{fileRejections.length !== 0 && 'Algunas imágenes fueron rechazadas. Deben ser menores a 1MB y de tipo PNG, JPG o JPEG'}
							</FormMessage>
						</FormItem>
					)}
				/>

				<Button type="submit" className="w-full" disabled={loading}>
					{loading ? <Spinner /> : 'Crear Producto'}
				</Button>
			</form>
		</Form>
	)
}

export default CreateProductForm

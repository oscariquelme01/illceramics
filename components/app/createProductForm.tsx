'use client'

import * as React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Spinner } from '../ui/shadcn-io/spinner'
import { ImagePlus, X } from 'lucide-react'
import { useDropzone } from 'react-dropzone'

const formSchema = z.object({
	name: z.string().min(1, { error: 'El nombre no puede estar vacio' }),
	description: z.string().min(1, { error: 'La descripción del producto no puede estar vacia' }),
	materials: z.string().min(1, { error: 'Los materiales no pueden estar vacios' }),
	dimensions: z.string().min(1, { error: 'Las dimensiones no pueden estar vacias' }),
	images: z.array(z.instanceof(File)).min(1, 'Por favor sube al menos una imagen').max(5, 'Máximo 5 imágenes permitidas'),
	weight: z.number().gt(0, { error: 'El peso debe ser mayor que 0' }),
	colors: z.array(z.string()).length(1, { error: 'Introduce al menos un color' })
})

export type FormValues = z.infer<typeof formSchema>

type CreateProductFormProps = {
	onSubmit: (values: FormValues) => Promise<void>
}

const CreateProductForm: React.FC<CreateProductFormProps> = ({ onSubmit }) => {
	const [loading, setLoading] = React.useState(false)
	const [previews, setPreviews] = React.useState<string[]>([])
	const [currentColor, setCurrentColor] = React.useState('#000000')

	const onSubmitWrapper = async (data: FormValues) => {
		setLoading(true)
		await onSubmit(data)
		setLoading(false)
	}

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
			description: '',
			materials: '',
			weight: 0,
			images: []
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
			<form onSubmit={form.handleSubmit(onSubmitWrapper)} className="w-full max-w-2xl space-y-6">
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

				{/* Password */}
				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Descripcion</FormLabel>
							<FormControl>
								<Input {...field} />
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

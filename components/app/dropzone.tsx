import React from 'react'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { FieldPath, UseFormReturn } from 'react-hook-form'
import { useDropzone } from 'react-dropzone'
import { ImagePlus, X } from 'lucide-react'
import { Input } from '../ui/input'

interface DropzoneProps<TFormValues extends Record<string, any>> {
	form: UseFormReturn<TFormValues>
	name: FieldPath<TFormValues>
}

export const Dropzone = <TFormValues extends Record<string, any>>({ form, name }: DropzoneProps<TFormValues>) => {
	// previews state variables
	const [previews, setPreviews] = React.useState<string[]>([])

	// watch the form value for changes to update the previews
	const currentImages = form.watch(name) || []

	// On drop callback launched when the user drops an image
	const onDrop = React.useCallback(
		(acceptedFiles: File[]) => {
			const currentFiles = form.getValues(name) || []
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

			form.setValue(name, newFiles as any)
			form.clearErrors(name)
		},
		[form]
	)

	const removeImage = (index: number) => {
		const currentFiles = (form.getValues(name) as string[]) || []
		const newFiles = currentFiles.filter((_, i) => i !== index)
		const newPreviews = previews.filter((_, i) => i !== index)

		form.setValue(name, newFiles as any)
		setPreviews(newPreviews)

		if (newFiles.length === 0) {
			form.trigger(name)
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
		<FormField
			control={form.control}
			name={name as any}
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
	)
}

export default Dropzone

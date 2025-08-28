import { useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Button } from '../ui/button'
import { X } from 'lucide-react'

interface ColorPickerProps<TFormValues extends Record<string, any>> {
	form: UseFormReturn<TFormValues>
	name: keyof TFormValues & string
}

export const ColorPicker = <TFormValues extends Record<string, any>>({ form, name }: ColorPickerProps<TFormValues>) => {
	const [currentColor, setCurrentColor] = useState('#000000')

	return (
		<FormField
			control={form.control}
			name={name as any} // TS often needs a cast here
			render={({ field }) => {
				// Make sure field.value is treated as string[]
				const colors: string[] = (field.value as string[]) || []

				const addColor = () => {
					if (!colors.includes(currentColor)) {
						field.onChange([...colors, currentColor])
					}
				}

				const removeColor = (colorToRemove: string) => {
					field.onChange(colors.filter(c => c !== colorToRemove))
				}

				return (
					<FormItem>
						<FormLabel>Colores disponibles</FormLabel>
						<FormControl>
							<div className="space-y-3">
								<div className="flex items-center gap-2">
									<input
										type="color"
										value={currentColor}
										onChange={e => setCurrentColor(e.target.value)}
										className="m-0 h-8 w-8 cursor-pointer !border-0 p-0 outline-none focus:border-none focus:outline-none"
									/>
									<Button type="button" onClick={addColor} size="sm" disabled={colors.includes(currentColor)}>
										Añadir color
									</Button>
								</div>

								{colors.length > 0 && (
									<div className="space-y-2">
										<p className="text-sm font-medium">Colores seleccionados:</p>
										<div className="flex flex-wrap gap-2">
											{colors.map(color => (
												<div key={color} className="bg-background-primary-200 flex items-center gap-2 rounded-lg border px-3 py-2">
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
	)
}

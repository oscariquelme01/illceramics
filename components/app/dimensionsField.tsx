import { FieldPath, UseFormReturn } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'

interface ColorPickerProps<TFormValues extends Record<string, any>> {
	form: UseFormReturn<TFormValues>
	name: FieldPath<TFormValues>
}

export const DimensionField = <TFormValues extends Record<string, any>>({ form, name }: ColorPickerProps<TFormValues>) => {
	return (
		<FormField
			control={form.control}
			name={name as any}
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
	)
}

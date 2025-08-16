'use client'

import * as React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Spinner } from '../ui/shadcn-io/spinner'

const formSchema = z.object({
	email: z.email({ error: 'Por favor, introduce un correo electrónico válido' }),
	password: z.string().nonempty({ error: 'La contraseña no puede estar vacia' })
})

export type FormValues = z.infer<typeof formSchema>

type LoginFormProps = {
	onSubmit: (values: FormValues) => Promise<void>
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
	const [loading, setLoading] = React.useState(false)

	const onSubmitWrapper = async (data: FormValues) => {
		setLoading(true)
		await onSubmit(data)
		setLoading(false)
	}

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
			password: ''
		},
		mode: 'onBlur' // validate on each change
	})

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmitWrapper)} className="w-full max-w-sm space-y-6">
				{/* Email */}
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input placeholder="tu@ejemplo.com" type="email" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* Password */}
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Contraseña</FormLabel>
							<FormControl>
								<Input placeholder="••••••••" type="password" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type="submit" variant="accent" className="text-foreground-500 w-full">
					{loading ? <Spinner /> : 'Iniciar sesión'}
				</Button>
			</form>
		</Form>
	)
}

export default LoginForm

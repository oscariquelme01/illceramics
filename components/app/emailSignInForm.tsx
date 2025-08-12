'use client'

import * as React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'

import { authClient } from '@/lib/authClient'

const formSchema = z.object({
	email: z.email({ error: 'Por favor, introduce un correo electrónico válido' }),
	password: z.string().nonempty({ error: 'La contraseña no puede estar vacia' })
})

type FormValues = z.infer<typeof formSchema>

export default function LoginForm() {
	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
			password: ''
		},
		mode: 'onBlur' // validate on each change
	})

	async function onSubmit(values: FormValues) {
		const { data, error } = await authClient.signIn.email({
			email: values.email, // required
			password: values.password, // required
			rememberMe: true,
			callbackURL: '/'
		})

		// wrong user & password
		if (error && error.statusText === 'UNAUTHORIZED') {
			toast.error('Correo electrónico o contraseña incorrectos')
		}

		console.log(data, error)
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-sm space-y-6">
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

				<Button type="submit" variant="accent" className="w-full">
					Iniciar sesión
				</Button>
			</form>
		</Form>
	)
}

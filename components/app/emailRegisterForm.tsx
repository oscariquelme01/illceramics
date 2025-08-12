'use client'

import * as React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { authClient } from '@/lib/authClient'

const formSchema = z
	.object({
		email: z.email({ error: 'Por favor, introduce un correo electrónico válido' }),
		password: z.string().nonempty({ error: 'La contraseña no puede estar vacia' }),
		firstName: z.string().nonempty({ error: 'El nombre no puede estar vacio' }),
		lastName: z.string().nonempty({ error: 'El apellido no puede estar vacio' }),
		confirmPassword: z.string().nonempty({ error: 'La contraseña de confirmación no puede estar vacia' })
	})
	.refine(data => data.password === data.confirmPassword, {
		path: ['confirmPassword'],
		error: 'Las contraseñas deben de coincidir'
	})

type FormValues = z.infer<typeof formSchema>

export default function RegisterForm() {
	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			confirmPassword: ''
		},
		mode: 'onBlur' // validate on each change
	})

	async function onSubmit(values: FormValues) {
		console.log('passed validation!')
		const { data, error } = await authClient.signUp.email(
			{
				email: values.email, // user email address
				password: values.password, // user password -> min 8 characters by default
				name: values.firstName + ' ' + values.lastName // user display name
			},
			{
				onRequest: () => {
					//show loading
					console.log('loading')
				},
				onSuccess: () => {
					alert('success')
				},
				onError: ctx => {
					// display the error message
					alert(ctx.error.message)
				}
			}
		)

		console.log(data, error)
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-sm space-y-6">
				{/* First name + Last name*/}
				<div className="flex gap-4">
					<FormField
						control={form.control}
						name="firstName"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Nombre</FormLabel>
								<FormControl>
									<Input placeholder="Carlos" type="text" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="lastName"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Apellidos</FormLabel>
								<FormControl>
									<Input placeholder="Martinez" type="text" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

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

				{/* Confirm password */}
				<FormField
					control={form.control}
					name="confirmPassword"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Confirmar contraseña</FormLabel>
							<FormControl>
								<Input placeholder="••••••••" type="password" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type="submit" variant="accent" className="w-full">
					¡Registrame!
				</Button>
			</form>
		</Form>
	)
}

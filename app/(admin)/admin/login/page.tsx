'use client'

import EmailLoginForm from '@/components/app/emailSignInForm'
import type { FormValues } from '@/components/app/emailSignInForm'

import { toast } from 'sonner'
import { authClient } from '@/lib/authClient'
import { redirect } from 'next/navigation'

export default function AdminLogin() {
	async function onSubmit(values: FormValues) {
		const { data, error } = await authClient.signIn.email({
			email: values.email, // required
			password: values.password, // required
			rememberMe: true
		})

		// wrong user & password
		if (error && error.statusText === 'UNAUTHORIZED') {
			toast.error('Correo electrónico o contraseña incorrectos')
		}

		// TODO: check if user is admin
		console.log(data, error)
		if (data?.user.email != process.env.ADMIN_EMAIL) {
			toast.error('El usuario introducido no es el administrador')
		}

		redirect('/admin/users')
	}

	return (
		<div className="flex h-full w-full flex-col items-center justify-center">
			<h2 className="text-foreground mb-8 text-center text-3xl font-bold">Inicia sesión como administrador</h2>
			<EmailLoginForm onSubmit={onSubmit} />
		</div>
	)
}

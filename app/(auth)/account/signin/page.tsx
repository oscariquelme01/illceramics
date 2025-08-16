'use client'

import EmailLoginForm from '@/components/app/emailSignInForm'
import type { FormValues } from '@/components/app/emailSignInForm'
import GoogleSignInButton from '@/components/app/googleSignInButton'

import { toast } from 'sonner'
import { authClient } from '@/lib/authClient'

export default function SignIn() {
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
		<div className="flex flex-grow items-center justify-center">
			<div className="bg-background-primary-500 w-full max-w-md space-y-8 p-8 shadow-2xl">
				<div>
					<h2 className="text-foreground text-center text-3xl font-bold">Inicia sesión en tu cuenta</h2>
				</div>

				<div className="space-y-4">
					{/* OAuth Buttons */}
					<GoogleSignInButton />

					<div className="relative flex items-center">
						<div className="border-foreground-200 flex-grow border-t"></div>
						<span className="text-foreground-300 mx-4 flex-shrink text-sm">o continuar con</span>
						<div className="border-foreground-200 flex-grow border-t"></div>
					</div>

					{/* Email/Password Form */}
					<EmailLoginForm onSubmit={onSubmit} />

					<div className="text-center">
						<span className="text-foreground-600 text-sm">
							¿No tienes una cuenta todavía?{' '}
							<a href="#" className="text-accent-600 hover:text-accent-500 font-medium">
								Registrate
							</a>
						</span>
					</div>
				</div>
			</div>
		</div>
	)
}

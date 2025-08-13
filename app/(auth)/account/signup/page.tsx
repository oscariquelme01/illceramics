'use client'

import RegisterForm from '@/components/app/emailRegisterForm'
import GoogleSignInButton from '@/components/app/googleSignInButton'

export default function SignUp() {
	return (
		<div className="flex flex-1 items-center justify-center">
			<div className="bg-background-primary-500 w-full max-w-md space-y-8 p-8 shadow-2xl">
				<div>
					<h2 className="text-foreground-700 text-center text-3xl font-bold">Crea tu cuenta</h2>
					<p className="text-foreground-600 mt-2 text-center text-sm">Únete a nosotros hoy y encuentra productos de cerámica</p>
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
					<RegisterForm />

					<div className="text-center">
						<span className="text-foreground-600 text-sm">
							¿Ya tienes una cuenta?{' '}
							<a href="/account/signin" className="text-accent-600 hover:text-accent-500 font-medium">
								Inicia sesión
							</a>
						</span>
					</div>
				</div>
			</div>
		</div>
	)
}

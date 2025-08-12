'use client'

import LoginForm from '@/components/app/emailSignInForm'

export default function SignIn() {
	const handleGoogleSignIn = () => {
		// Handle Google OAuth
		console.log('Google sign in')
	}

	const handleGitHubSignIn = () => {
		// Handle GitHub OAuth
		console.log('GitHub sign in')
	}

	return (
		<div className="bg-background flex flex-grow items-center justify-center">
			<div className="w-full max-w-md space-y-8 p-8">
				<div>
					<h2 className="text-foreground text-center text-3xl font-bold">Inicia sesión en tu cuenta</h2>
				</div>

				<div className="space-y-4">
					{/* OAuth Buttons */}
					<button
						onClick={handleGoogleSignIn}
						className="flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
					>
						Continuar con Google
					</button>

					<button
						onClick={handleGitHubSignIn}
						className="flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
					>
						Continuar con GitHub
					</button>

					<div className="relative flex items-center">
						<div className="border-foreground-200 flex-grow border-t"></div>
						<span className="text-foreground-300 mx-4 flex-shrink text-sm">o continuar con</span>
						<div className="border-foreground-200 flex-grow border-t"></div>
					</div>

					{/* Email/Password Form */}
					<LoginForm />

					<div className="text-center">
						<span className="text-sm text-gray-600">
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

'use client'

import RegisterForm from '@/components/app/emailRegisterForm'

export default function SignUp() {
	const handleGoogleSignUp = () => {
		// Handle Google OAuth
		console.log('Google sign up')
	}

	const handleGitHubSignUp = () => {
		// Handle GitHub OAuth
		console.log('GitHub sign up')
	}

	return (
		<div className="flex min-h-screen items-center justify-center bg-gray-50">
			<div className="w-full max-w-md space-y-8 p-8">
				<div>
					<h2 className="text-center text-3xl font-bold text-gray-900">Create your account</h2>
					<p className="mt-2 text-center text-sm text-gray-600">Join us today and get started</p>
				</div>

				<div className="space-y-4">
					{/* OAuth Buttons */}
					<button
						onClick={handleGoogleSignUp}
						className="flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
					>
						Continue with Google
					</button>

					<button
						onClick={handleGitHubSignUp}
						className="flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
					>
						Continue with GitHub
					</button>

					<div className="relative">
						<div className="absolute inset-0 flex items-center">
							<div className="w-full border-t border-gray-300" />
						</div>
						<div className="relative flex justify-center text-sm">
							<span className="bg-gray-50 px-2 text-gray-500">Or continue with</span>
						</div>
					</div>

					{/* Email/Password Form */}
					<RegisterForm />

					<div className="text-center">
						<span className="text-sm text-gray-600">
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

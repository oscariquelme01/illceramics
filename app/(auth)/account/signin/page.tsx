'use client'

export default function SignUp() {
	const handleEmailSignUp = (e: React.FormEvent) => {
		e.preventDefault()
		// Handle email/password sign up
		console.log('Email sign up')
	}

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
					<form onSubmit={handleEmailSignUp} className="space-y-4">
						<div className="grid grid-cols-2 gap-4">
							<div>
								<label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
									First name
								</label>
								<input
									id="firstName"
									name="firstName"
									type="text"
									required
									className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
									placeholder="John"
								/>
							</div>

							<div>
								<label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
									Last name
								</label>
								<input
									id="lastName"
									name="lastName"
									type="text"
									required
									className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
									placeholder="Doe"
								/>
							</div>
						</div>

						<div>
							<label htmlFor="email" className="block text-sm font-medium text-gray-700">
								Email address
							</label>
							<input
								id="email"
								name="email"
								type="email"
								required
								className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
								placeholder="john@example.com"
							/>
						</div>

						<div>
							<label htmlFor="password" className="block text-sm font-medium text-gray-700">
								Password
							</label>
							<input
								id="password"
								name="password"
								type="password"
								required
								className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
								placeholder="Create a strong password"
							/>
						</div>

						<div>
							<label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
								Confirm password
							</label>
							<input
								id="confirmPassword"
								name="confirmPassword"
								type="password"
								required
								className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
								placeholder="Confirm your password"
							/>
						</div>

						<div className="flex items-start">
							<div className="flex h-5 items-center">
								<input
									id="terms"
									name="terms"
									type="checkbox"
									required
									className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
								/>
							</div>
							<div className="ml-3 text-sm">
								<label htmlFor="terms" className="text-gray-900">
									I agree to the{' '}
									<a href="#" className="font-medium text-blue-600 hover:text-blue-500">
										Terms of Service
									</a>{' '}
									and{' '}
									<a href="#" className="font-medium text-blue-600 hover:text-blue-500">
										Privacy Policy
									</a>
								</label>
							</div>
						</div>

						<button
							type="submit"
							className="flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
						>
							Create account
						</button>
					</form>

					<div className="text-center">
						<span className="text-sm text-gray-600">
							Already have an account?{' '}
							<a href="/account/signin" className="font-medium text-blue-600 hover:text-blue-500">
								Sign in
							</a>
						</span>
					</div>
				</div>
			</div>
		</div>
	)
}

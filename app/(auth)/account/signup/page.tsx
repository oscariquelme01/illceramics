'use client'

export default function SignIn() {
	const handleEmailSignIn = (e: React.FormEvent) => {
		e.preventDefault()
		// Handle email/password sign in
		console.log('Email sign in')
	}

	const handleGoogleSignIn = () => {
		// Handle Google OAuth
		console.log('Google sign in')
	}

	const handleGitHubSignIn = () => {
		// Handle GitHub OAuth
		console.log('GitHub sign in')
	}

	return (
		<div className="flex min-h-screen items-center justify-center bg-gray-50">
			<div className="w-full max-w-md space-y-8 p-8">
				<div>
					<h2 className="text-center text-3xl font-bold text-gray-900">Sign in to your account</h2>
				</div>

				<div className="space-y-4">
					{/* OAuth Buttons */}
					<button
						onClick={handleGoogleSignIn}
						className="flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
					>
						Continue with Google
					</button>

					<button
						onClick={handleGitHubSignIn}
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
					<form onSubmit={handleEmailSignIn} className="space-y-4">
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
								placeholder="Enter your email"
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
								placeholder="Enter your password"
							/>
						</div>

						<div className="flex items-center justify-between">
							<div className="flex items-center">
								<input
									id="remember-me"
									name="remember-me"
									type="checkbox"
									className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
								/>
								<label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
									Remember me
								</label>
							</div>

							<div className="text-sm">
								<a href="#" className="font-medium text-blue-600 hover:text-blue-500">
									Forgot your password?
								</a>
							</div>
						</div>

						<button
							type="submit"
							className="flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
						>
							Sign in
						</button>
					</form>

					<div className="text-center">
						<span className="text-sm text-gray-600">
							Don&apos;t have an account?{' '}
							<a href="#" className="font-medium text-blue-600 hover:text-blue-500">
								Sign up
							</a>
						</span>
					</div>
				</div>
			</div>
		</div>
	)
}

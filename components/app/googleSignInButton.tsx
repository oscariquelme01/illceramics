import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { authClient } from '@/lib/authClient'
import Image from 'next/image'
import { Spinner } from '../ui/shadcn-io/spinner'

function GoogleSignInButton() {
	const [loading, setLoading] = useState(false)

	const handleGoogleSignIn = async () => {
		try {
			await authClient.signIn.social({
				provider: 'google' // or any other provider id
			})
		} finally {
			setLoading(false)
		}
	}

	return (
		<Button onClick={handleGoogleSignIn} variant="oauth" className="flex w-full justify-center" size="lg">
			{loading ? (
				<Spinner />
			) : (
				<>
					<Image className="" src="/icons/google-icon.svg" width={24} height={24} alt="google-icon" /> Continuar con google{' '}
				</>
			)}
		</Button>
	)
}

export default GoogleSignInButton

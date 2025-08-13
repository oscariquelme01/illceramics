import React from 'react'
import { Button } from '@/components/ui/button'
import { authClient } from '@/lib/authClient'
import Image from 'next/image'

function googleSignInButton() {
	const handleGoogleSignIn = async () => {
		// TODO: SHOW LOADING STUFF
		await authClient.signIn.social({
			provider: 'google' // or any other provider id
		})
	}

	return (
		<Button onClick={handleGoogleSignIn} variant="oauth" className="flex w-full justify-center" size="lg">
			<Image className="" src="/icons/google-icon.svg" width={24} height={24} alt="google-icon" /> Continuar con google
		</Button>
	)
}

export default googleSignInButton

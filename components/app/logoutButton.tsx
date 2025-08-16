'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { authClient } from '@/lib/authClient'
import { LogOut } from 'lucide-react'
import { Spinner } from '../ui/shadcn-io/spinner'

function LogoutButton() {
	const [loading, setLoading] = useState(false)

	const handleLogout = async () => {
		setLoading(true)
		try {
			await authClient.signOut()
		} finally {
			setLoading(false)
		}
	}

	return (
		<Button onClick={handleLogout} variant="default" className="flex w-full items-center justify-center p-0">
			{loading ? (
				<Spinner />
			) : (
				<>
					<LogOut size={32} /> Cerrar sesión
				</>
			)}
		</Button>
	)
}

export default LogoutButton

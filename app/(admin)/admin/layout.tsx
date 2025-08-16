'use client'

import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import Sidebar from '@/components/app/adminSidebar'

import '@/app/globals.css'
import { authClient } from '@/lib/authClient'
import { redirect, usePathname } from 'next/navigation'
import { Playfair, Playfair_Display, Roboto } from 'next/font/google'
import { useEffect } from 'react'
import { Spinner } from '@/components/ui/shadcn-io/spinner'

const roboto = Roboto({
	variable: '--font-roboto',
	subsets: ['latin']
})

const playfair = Playfair({
	variable: '--font-playfair',
	subsets: ['latin']
})

const playfairDisplay = Playfair_Display({
	variable: '--font-playfair-display',
	subsets: ['latin']
})

export default function Layout({ children }: { children: React.ReactNode }) {
	const { data: session, isPending } = authClient.useSession()
	const pathname = usePathname()

	useEffect(() => {
		if (!isPending) {
			if (pathname !== '/admin/login') {
				if (!session) redirect('/admin/login')
				if (!session?.user.role?.includes('admin')) redirect('/admin/login')
			} else {
				if (session?.user.role?.includes('admin')) redirect('/admin/users')
			}
		}
	}, [isPending, session]) // Dependencies array

	return (
		<html lang="es">
			<body className={`${roboto.variable} ${playfair.variable} ${playfairDisplay.variable} antialiased`}>
				{isPending ? (
					<div className="flex h-screen w-screen items-center justify-center">
						<Spinner size="48" />
					</div>
				) : (
					<SidebarProvider>
						{pathname !== '/admin/login' && <Sidebar />}
						<main className="w-full">
							{pathname !== '/admin/login' && <SidebarTrigger />}
							{children}
						</main>
					</SidebarProvider>
				)}
			</body>
		</html>
	)
}

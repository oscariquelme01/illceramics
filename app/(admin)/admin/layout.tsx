'use client'

import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import Sidebar from '@/components/app/adminSidebar'

import { authClient } from '@/lib/authClient'
import { redirect, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Spinner } from '@/components/ui/shadcn-io/spinner'

export default function Layout({ children }: { children: React.ReactNode }) {
	const { data: session, isPending } = authClient.useSession()
	const pathname = usePathname()

	const [name, setName] = useState('')

	useEffect(() => {
		if (!isPending) {
			// Grab the name to display in the sidebar
			const firstName = session?.user.name!.split(' ')[0] || ''
			setName(firstName)

			if (pathname !== '/admin/login') {
				if (!session) redirect('/admin/login')
				if (!session?.user.role?.includes('admin')) redirect('/admin/login')
			} else {
				if (session?.user.role?.includes('admin')) redirect('/admin/users')
			}
		}
	}, [isPending, session]) // Dependencies array

	return isPending ? (
		<div className="flex h-screen w-screen items-center justify-center">
			<Spinner size="48" />
		</div>
	) : (
		<SidebarProvider>
			{pathname !== '/admin/login' && <Sidebar name={name} />}
			<main className="w-full">
				{pathname !== '/admin/login' && <SidebarTrigger />}
				{children}
			</main>
		</SidebarProvider>
	)
}

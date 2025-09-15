'use client'

import Navbar from '@/components/app/navbar'
import Sidebar from '@/components/app/sidebar'
import Footer from '@/components/app/footer'

import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import LoadingLogo from '@/components/app/loadingLogo'

function getCookie(name: string) {
	const value = `; ${document.cookie}`
	const parts = value.split(`; ${name}=`)
	if (parts.length === 2) return parts.pop()?.split(';').shift()
	return null
}

export default function MainLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const cookie = getCookie('first_load')

		if (!cookie) {
			// Show loader for 3 seconds on first visit
			const timer = setTimeout(() => setIsLoading(false), 3000)

			// Set persistent cookie (1 year)
			document.cookie = 'first_load=true; path=/;'

			return () => clearTimeout(timer) // cleanup if unmounted
		} else {
			// Skip loader if cookie exists
			setIsLoading(false)
		}
	}, [])

	return isLoading ? (
		<AnimatePresence>
			<motion.div
				key="loader"
				initial={{ opacity: 1 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0.5, scale: 0.2 }}
				transition={{ duration: 0.3, ease: 'easeInOut' }}
			>
				<LoadingLogo />
			</motion.div>
		</AnimatePresence>
	) : (
		<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.3 }}>
			<Sidebar />
			<main className="relative grid grid-cols-3 sm:grid-cols-[1fr_5fr_5fr_1fr] xl:grid-cols-[1fr_4fr_3fr_2fr_3fr]">
				<Navbar className="col-span-full" />
				{children}
				<Footer className="border-foreground-500 col-span-3 sm:col-span-2 sm:col-start-2 sm:border-r sm:border-l xl:col-span-2 xl:col-start-2 xl:border-r-0" />
			</main>
		</motion.div>
	)
}

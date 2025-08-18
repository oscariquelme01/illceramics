'use client'

import Navbar from '@/components/app/navbar'
import Sidebar from '@/components/app/sidebar'
import { Toaster } from '@/components/ui/sonner'
import { motion } from 'framer-motion'

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.3 }}>
			<Sidebar />
			<main className="bg-background-primary-500 flex min-h-screen flex-col">
				<Navbar className="col-span-full" />
				{children}
			</main>
			<Toaster />
		</motion.div>
	)
}

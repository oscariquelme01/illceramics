import type { Metadata } from 'next'
import { Roboto, Playfair, Playfair_Display } from 'next/font/google'

import '@/app/globals.css'

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

export const metadata: Metadata = {
	title: 'Illceramics',
	description: 'Ecommerce ceramic shop'
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body className={`${roboto.variable} ${playfair.variable} ${playfairDisplay.variable} selection:bg-accent-500 antialiased`}>{children}</body>
		</html>
	)
}

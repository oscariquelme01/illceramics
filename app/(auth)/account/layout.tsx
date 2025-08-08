import type { Metadata } from 'next'
import { Roboto, Playfair, Playfair_Display } from 'next/font/google'
import '@/app/globals.css'
import Navbar from '@/components/app/navbar'
import Sidebar from '@/components/app/sidebar'

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
			<body className={`${roboto.variable} ${playfair.variable} ${playfairDisplay.variable} antialiased`}>
				<Sidebar />
				<main className="">
					<Navbar className="col-span-full" />
					{children}
				</main>
			</body>
		</html>
	)
}

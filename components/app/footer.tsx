import { Separator } from '@radix-ui/react-separator'
import React from 'react'
import { cn } from '@/lib/utils'

type FooterProps = {
	className: string
}

const footer: React.FC<FooterProps> = ({ className }) => {
	return (
		<footer className={cn('', className)}>
			<div className="mx-auto max-w-6xl px-6 py-8">
				<div className="grid grid-cols-3 gap-8 md:grid-cols-4">
					{/* Company Info */}
					<div className="space-y-4">
						<h3 className="text-lg font-semibold">Company</h3>
						<div className="space-y-2">
							<p className="text-foreground-400 hover:text-foreground-700 cursor-pointer text-sm">About Us</p>
							<p className="text-foreground-400 hover:text-foreground-700 cursor-pointer text-sm">Careers</p>
							<p className="text-foreground-400 hover:text-foreground-700 cursor-pointer text-sm">Contact</p>
						</div>
					</div>

					{/* Products */}
					<div className="space-y-4">
						<h3 className="text-lg font-semibold">Products</h3>
						<div className="space-y-2">
							<p className="text-foreground-400 hover:text-foreground-700 cursor-pointer text-sm">Features</p>
							<p className="text-foreground-400 hover:text-foreground-700 cursor-pointer text-sm">Pricing</p>
							<p className="text-foreground-400 hover:text-foreground-700 cursor-pointer text-sm">Enterprise</p>
						</div>
					</div>

					{/* Resources */}
					<div className="space-y-4">
						<h3 className="text-lg font-semibold">Resources</h3>
						<div className="space-y-2">
							<p className="text-foreground-400 hover:text-foreground-700 cursor-pointer text-sm">Documentation</p>
							<p className="text-foreground-400 hover:text-foreground-700 cursor-pointer text-sm">Blog</p>
							<p className="text-foreground-400 hover:text-foreground-700 cursor-pointer text-sm">Support</p>
						</div>
					</div>
				</div>

				<Separator className="my-8" />

				{/* Bottom section */}
				<div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
					<div className="flex items-center space-x-4">
						<p className="text-foreground-400 text-sm">© 2024 Company Name. All rights reserved.</p>
					</div>
					<div className="flex items-center space-x-6">
						<p className="text-foreground-400 hover:text-foreground-700 cursor-pointer text-sm">Privacy Policy</p>
						<p className="text-foreground-400 hover:text-foreground-700 cursor-pointer text-sm">Terms of Service</p>
						<p className="text-foreground-400 hover:text-foreground-700 cursor-pointer text-sm">Cookie Policy</p>
					</div>
				</div>
			</div>
		</footer>
	)
}

export default footer

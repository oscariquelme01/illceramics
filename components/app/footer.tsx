import { Separator } from '@radix-ui/react-separator'
import React from 'react'
import { cn } from '@/lib/utils'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

type FooterProps = {
	className: string
}

const footerLinks: React.FC<FooterProps> = ({ className }) => {
	return (
		<footer className={cn('', className)}>
			<div className="mx-auto max-w-6xl px-6 py-8">
				<div className="flex flex-col sm:flex-row">
					<div className="grid grid-cols-4 gap-8 md:grid-cols-4">
						{/* Company Info */}
						<div className="space-y-4">
							<h3 className="text-lg font-semibold">Compañia</h3>
							<div className="space-y-2">
								<p className="text-foreground-400 hover:text-foreground-700 cursor-pointer text-sm">About Us</p>
								<p className="text-foreground-400 hover:text-foreground-700 cursor-pointer text-sm">Encargos Personalizados</p>
								<p className="text-foreground-400 hover:text-foreground-700 cursor-pointer text-sm">Contacto</p>
							</div>
						</div>

						{/* Products */}
						<div className="space-y-4">
							<h3 className="text-lg font-semibold">Productos</h3>
							<div className="space-y-2">
								<p className="text-foreground-400 hover:text-foreground-700 cursor-pointer text-sm">Catálago</p>
								<p className="text-foreground-400 hover:text-foreground-700 cursor-pointer text-sm">Encargos Personalizados</p>
								<p className="text-foreground-400 hover:text-foreground-700 cursor-pointer text-sm">Enterprise</p>
							</div>
						</div>

						{/* Resources */}
						<div className="space-y-4">
							<h3 className="text-lg font-semibold">Recursos</h3>
							<div className="space-y-2">
								<p className="text-foreground-400 hover:text-foreground-700 cursor-pointer text-sm">Documentación</p>
								<p className="text-foreground-400 hover:text-foreground-700 cursor-pointer text-sm">Blog</p>
								<p className="text-foreground-400 hover:text-foreground-700 cursor-pointer text-sm">Support</p>
							</div>
						</div>
					</div>

					{/* Newsletter */}
					<div className="my-4 space-y-4 sm:my-0">
						<h3 className="text-lg font-semibold">¡Mantente Actualizado!</h3>
						<p className="text-foreground-600 text-sm">Subscríbete a nuestra News Letter</p>
						<div className="flex space-x-2">
							<Input placeholder="Introduce to email" className="flex-1" />
							<Button size="sm">¡Subscríbete!</Button>
						</div>
					</div>
				</div>

				<Separator className="my-8" />

				{/* Bottom section */}
				<div className="flex flex-col items-center justify-around space-y-4 md:flex-row md:space-y-0">
					<div className="flex items-center space-x-4">
						<p className="text-foreground-400 text-sm">© 2025 Illceramics. All rights reserved.</p>
					</div>
					<div className="flex items-center space-x-6">
						<p className="text-foreground-400 hover:text-foreground-700 cursor-pointer text-sm">Pólitica de Privacidad</p>
						<p className="text-foreground-400 hover:text-foreground-700 cursor-pointer text-sm">Términos de Servicio</p>
						<p className="text-foreground-400 hover:text-foreground-700 cursor-pointer text-sm">Pólitica de Cookies</p>
					</div>
				</div>
			</div>
		</footer>
	)
}

export default footerLinks

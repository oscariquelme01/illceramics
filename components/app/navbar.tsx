import { SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

import { cn } from '@/lib/utils'

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import Link from 'next/link'

interface NavbarProps {
	className?: string
}

export default function Navbar({ className }: NavbarProps) {
	return (
		<nav className={cn('border-b-foreground-500 flex w-full items-center justify-between border-b py-4', className)}>
			<Link href="/" className="flex items-end">
				<Image src="/icons/logo-navbar.svg" alt="logo" width={48} height={48} className="lg:ml-10" />
				<span className="font-header text-2xl">Illceramics</span>
			</Link>
			<div className="flex items-center">
				<div className="mr-10 hidden justify-around gap-8 sm:flex">
					{/*
					<Image src="/icons/heart-icon.svg" alt="favourites" width={32} height={32} />
					<Image src="/icons/bag-icon.svg" alt="cart" width={32} height={32} />
					*/}
					<Button variant="ghost" asChild>
						<Link href="/account/signin">Iniciar sesión</Link>
					</Button>
					<Button variant="accent">
						<Link href="/account/signup">¡Regístrate!</Link>
					</Button>
				</div>

				<Sheet>
					<SheetTrigger>
						<Image src="/icons/menu-mobile-icon.svg" alt="mobile-icon" width={32} height={32} className="mr-4 sm:hidden" />
					</SheetTrigger>
					<SheetContent>
						<SheetHeader>
							<SheetTitle>This is some serious navigation</SheetTitle>
							<SheetDescription>
								Link 1<br /> Link 2 brrr
								<br />
							</SheetDescription>
						</SheetHeader>
					</SheetContent>
				</Sheet>
			</div>
		</nav>
	)
}

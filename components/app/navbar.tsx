'use client'

import { SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

import { cn } from '@/lib/utils'

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import Link from 'next/link'
import { authClient } from '@/lib/authClient'

import { Heart, ShoppingBag, User } from 'lucide-react'
import { Spinner } from '../ui/shadcn-io/spinner'

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

interface NavbarProps {
	className?: string
}

function renderLoggedInNavbar() {
	return (
		<>
			<Heart size={32} strokeWidth={1.2} />
			<ShoppingBag size={32} strokeWidth={1.2} />

			{/*Account dropdown menu*/}
			<DropdownMenu>
				<DropdownMenuTrigger className="focus:outline-none">
					<User size={32} strokeWidth={1.5} />
				</DropdownMenuTrigger>
				<DropdownMenuContent className="relative right-2">
					<DropdownMenuLabel>My Account</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuItem>Profile</DropdownMenuItem>
					<DropdownMenuItem>Billing</DropdownMenuItem>
					<DropdownMenuItem>Team</DropdownMenuItem>
					<DropdownMenuItem>Subscription</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	)
}

function renderLoggedOutNavbar() {
	return (
		<>
			<Button variant="ghost" asChild>
				<Link href="/account/signin">Iniciar sesión</Link>
			</Button>
			<Button variant="accent">
				<Link href="/account/signup">¡Regístrate!</Link>
			</Button>
		</>
	)
}

export default function Navbar({ className }: NavbarProps) {
	const { data, isPending } = authClient.useSession()

	const renderRightSide = () => {
		if (isPending) return <Spinner />

		return data ? renderLoggedInNavbar() : renderLoggedOutNavbar()
	}

	return (
		<nav className={cn('border-b-foreground-500 flex w-full items-center justify-between border-b py-4', className)}>
			<Link href="/" className="flex items-end">
				<Image src="/icons/logo-navbar.svg" alt="logo" width={48} height={48} className="lg:ml-10" />
				<span className="font-header text-2xl">Illceramics</span>
			</Link>
			<div className="flex items-center">
				<div className="mr-10 hidden justify-around gap-8 sm:flex">{renderRightSide()}</div>

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

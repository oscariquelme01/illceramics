import { SheetTrigger } from "@/components/ui/sheet"
import Image from "next/image"

import { cn } from "@/lib/utils"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"


interface NavbarProps {
  className?: string
}

export default function Navbar({ className }: NavbarProps) {
  return (
    <nav className={cn(
      "w-full border-b-2 border-b-foreground flex items-center justify-between py-4",
      className
      )}>
      <Image src="/logo.svg" alt="logo" width={32} height={32} className="ml-10"/>
      <div className="sm:flex justify-around gap-16 mr-16 hidden md:block">
        <Image src="/icons/heart-icon.svg" alt="favourites" width={32} height={32}/>
        <Image src="/icons/bag-icon.svg" alt="cart" width={32} height={32}/>
      </div>

      <Sheet>
        <SheetTrigger>
            <Image src="/icons/menu-mobile-icon.svg" alt="mobile-icon" width={32} height={32} className="md:hidden mr-4"/>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>This is some serious navigation</SheetTitle>
            <SheetDescription>
                Link 1<br/> Link 2<br/>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </nav>
  )
}

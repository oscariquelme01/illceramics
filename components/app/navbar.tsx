import { SidebarTrigger } from "@/components/ui/sidebar"
import Image from "next/image"

import { cn } from "@/lib/utils"

interface NavbarProps {
  className?: string
}

export default function Navbar({ className}: NavbarProps) {
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

      <SidebarTrigger/>
    </nav>
  )
}

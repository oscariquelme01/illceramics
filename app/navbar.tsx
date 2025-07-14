import Image from "next/image"

export default function Navbar() {
  return (
    <nav className="w-full border-b-2 border-b-foreground flex items-center justify-between py-4">
      <Image src="/logo.svg" alt="logo" width={32} height={32} className="ml-10"/>
      <div className="flex justify-around gap-16 mr-16 hidden md:block">
        <Image src="/icons/heart-icon.svg" alt="favourites" width={32} height={32}/>
        <Image src="/icons/bag-icon.svg" alt="cart" width={32} height={32}/>
      </div>

      <Image src="/icons/menu-mobile-icon.svg" alt="mobile-icon" width={32} height={32} className="md:hidden mr-4"/>
    </nav>
  )
}

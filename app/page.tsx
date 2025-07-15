import { Instagram, Mail } from "lucide-react";
import Image from "next/image"

export default function Home() {
  return (
    <>
      {/* darker bacground divider*/}
      <span className="bg-background-dark absolute row-start-5 row-span-2 col-span-3 h-full w-full"/>

      <div className="relative col-span-3 h-56 border-b-2 border-b-foreground flex items-end">
        <span className="z-[-1] absolute w-3/5 bg-background-light left-1/2 transform -translate-x-1/2 h-40"/>
        <a href="/catalog" className="z-20 font-header text-3xl absolute top-3/5 left-1/2 transform -translate-x-1/2 -translate-y-1/3 underline underline-offset-[16px]">Ver Catálogo</a>
        <span className="z-[-1] absolute w-1/12 bg-accent-light left-1/2 transform -translate-x-1/2 h-36"/>
      </div>

      <div className="p-4 flex items-end justify-center gap-4 border-b-2 col-span-3 border-b-foreground">
        <Image className="" src="/logo.svg" alt="logo" width={48} height={94}/>
        <h1 className="font-display text-3xl tracking-[0.2em]">ILLCERAMICS</h1>
      </div>

      <div className="col-span-2 relative h-[322px] border-b-2 border-r-2 border-foreground">
        <Image src="/images/landing-image-1.png" fill alt="landing image 1" className="object-cover"/>
      </div>

      <div className="col-span-1 border-b-2 border-foreground flex flex-col justify-center items-center gap-8">
        <a href="https://www.instagram.com/illceramics/"><Instagram className="w-12 h-12 stroke-1"/></a>
        <Mail className="w-12 h-12 stroke-1"/>
      </div>

      <p className="font-paragraph italic z-10 col-span-3 p-6 border-b-2 border-foreground"> Parrafo breve sobre la empresa. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim </p>

      <div className="flex items-center justify-center">
        <div className="transform -rotate-90 font-header whitespace-nowrap text-2xl underline underline-offset-8">Encargos personalizados</div>
      </div>

      <div className="col-span-2 relative h-[322px] border-l-2 border-foreground">
        <Image src="/images/landing-image-2.png" fill alt="landing image 1" className="object-cover"/>
      </div>
    </>
  );
}

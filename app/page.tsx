import { Instagram, Mail } from "lucide-react";
import Image from "next/image"

export default function Home() {
  return (
    <>
      {/* darker bacground divider*/}
      <span className="bg-background-dark border-foreground absolute row-start-5 row-span-2 col-span-3 h-full w-full lg:col-start-4 lg:row-start-1 lg:col-span-2 lg:border-l-2 lg:row-span-4 -z-10"/>

      <div className="relative col-span-3 h-56 border-b-2 border-foreground flex items-end lg:col-start-2 lg:row-start-3 lg:col-span-1 lg:border-r-2 lg:border-l-2 lg:h-full lg:row-span-2">
        <span className="z-[-1] absolute w-3/5 bg-background-light left-1/2 transform -translate-x-1/2 h-40 lg:h-56"/>
        <a href="/catalog" className="z-20 font-header text-3xl absolute top-3/5 left-1/2 transform -translate-x-1/2 -translate-y-1/3 underline underline-offset-[16px] lg:text-4xl">Ver Catálogo</a>
        <span className="z-[-1] absolute w-1/12 bg-accent-light left-1/2 transform -translate-x-1/2 h-36 lg:h-48"/>
      </div>

      <div className="p-4 flex items-end justify-center gap-4 border-b-2 col-span-3 border-foreground lg:row-start-2 lg:col-start-1 lg:col-span-3">
        <div className="relative w-12 h-24 lg:w-24 lg:h-48"><Image className="" src="/logo.svg" alt="logo" fill/></div>
        <h1 className="font-display text-3xl tracking-[0.2em] lg:text-7xl">ILLCERAMICS</h1>
      </div>

      <div className="col-span-2 relative h-[322px] border-b-2 border-r-2 border-foreground lg:col-start-3 lg:row-start-3 lg:col-span-1 lg:border-r-0 lg:row-span-2 lg:border-b-2 lg:h-[400px]">
        <Image src="/images/landing-image-1.png" fill alt="landing image 1" className="object-cover"/>
      </div>

      <div className="col-span-1 border-b-2 border-foreground flex justify-center items-center gap-8 relative lg:justify-center">
        <div className="flex flex-col justify-center items-center gap-8 lg:ml-8">
          <a href="https://www.instagram.com/illceramics/"><Instagram className="w-12 h-12 stroke-1"/></a>
          <Mail className="w-12 h-12 stroke-1"/>
        </div>
        {/*desktop decoration*/}
        <Image src="/images/cell-decor.png" width={160} height={160} alt="cell decoration" className="hidden lg:block relative -right-24"/>
      </div>

      <p className="font-paragraph italic z-10 col-span-3 p-6 border-b-2 border-foreground lg:col-start-4 lg:row-start-4 lg:col-span-2 lg:border-b-2 lg:text-xl flex items-center"> Parrafo breve sobre la empresa. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim </p>

      <div className="flex items-center border-foreground justify-center lg:col-start-4 lg:row-start-3 lg:col-span-2 lg:border-b-2">
        <div className="transform -rotate-90 font-header whitespace-nowrap text-2xl underline underline-offset-8 lg:transform-none lg:rotate-none lg:text-4xl lg:p-16">Encargos personalizados</div>
      </div>

      <div className="col-span-2 relative h-[322px] border-l-2 border-foreground lg:col-start-4 lg:row-start-2 lg:col-span-1 lg:border-b-2 lg:h-auto lg:border-r-2">
        <Image src="/images/landing-image-2.png" fill alt="landing image 1" className="object-cover"/>
      </div>

      {/*desktop lines*/}
      <span className="hidden lg:block col-start-1 row-start-3 h-full row-span-2 border-foreground border-b-2"/>

    </>
  );
}

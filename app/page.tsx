import Image from "next/image";
import Navbar from "./navbar";

export default function Home() {
  return (
    <div className="grid grid-cols-3">
      <div className="col-span-3">
        <Navbar/>
      </div>

      <div className="p-4 flex items-end gap-4 border-b-2 col-span-3 border-b-foreground">
        <Image className="" src="/logo.svg" alt="logo" width={48} height={94}/>
        <h1 className="font-display text-4xl tracking-[0.2em]">ILLCERAMICS</h1>
      </div>

      <div className="relative col-span-3 h-56 border-b-2 border-b-foreground flex items-end">
        <span className="absolute w-3/5 bg-background-light left-1/2 transform -translate-x-1/2 h-40"/>
        <div className="z-20 font-header text-2xl absolute top-3/5 left-1/2 transform -translate-x-1/2 -translate-y-1/3 underline underline-offset-[16px]">Ver Catálogo</div>
        <span className="absolute w-1/12 bg-accent-light left-1/2 transform -translate-x-1/2 h-36"/>
      </div>

      <div className="col-span-2 relative h-[322px] border-b-2 border-r-2 border-foreground">
        <Image src="/images/landing-image-1.png" fill alt="landing image 1" className="object-cover"/>
      </div>

      <div className="col-span-1 border-b-2 border-foreground flex flex-col justify-center items-center gap-8">
        <Image src="/icons/insta-icon.svg" height={48} width={48} alt="insta icon"/>
        <Image src="/icons/mail-icon.svg" height={48} width={48} alt="mail icon"/>
      </div>
    </div>
  );
}

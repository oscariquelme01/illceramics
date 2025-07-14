import Image from "next/image";
import Navbar from "./navbar";

export default function Home() {
  return (
    <div className="grid grid-cols-3">
      <div className="col-span-3">
        <Navbar/>
      </div>

      <div className="p-4 flex items-end gap-8 border-b-2 col-span-3 border-b-foreground">
        <Image className="" src="/logo.svg" alt="logo" width={48} height={94}/>
        <h1 className="font-display text-4xl tracking-[0.2em]">ILLCERAMICS</h1>
      </div>

      <div className="relative col-span-3 h-56 border-b-2 border-b-foreground flex items-end">
        <span className="absolute w-3/5 bg-background-light left-1/2 transform -translate-x-1/2 h-40"/>
        <div className="z-20 font-header text-2xl absolute top-3/5 left-1/2 transform -translate-x-1/2 -translate-y-1/3 underline underline-offset-8">Ver Catálogo</div>
        <span className="absolute w-1/12 bg-accent-light left-1/2 transform -translate-x-1/2 h-36"/>
      </div>
    </div>
  );
}

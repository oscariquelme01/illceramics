import { Instagram, Mail } from 'lucide-react'
import Image from 'next/image'

export default function Home() {
	return (
		<>
			{/* darker bacground divider*/}
			<span className="bg-background-secondary-500 border-foreground-500 absolute -z-10 col-span-3 row-span-3 row-start-5 h-full w-full sm:col-span-full sm:col-start-1 sm:row-start-5 xl:col-span-2 xl:col-start-4 xl:row-span-5 xl:row-start-1 xl:border-l" />

			<div className="group border-foreground-500 relative col-span-3 flex h-56 items-end border-b sm:col-span-1 sm:col-start-2 sm:row-start-3 sm:border-r sm:border-l xl:col-start-2 xl:row-span-2 xl:row-start-3 xl:h-full">
				{/* White rectangle shape */}
				<span className="bg-background-primary-100 absolute left-1/2 z-[2] h-40 w-3/5 origin-bottom -translate-x-1/2 transform transition-all duration-300 group-hover:scale-x-110 group-hover:scale-y-110 xl:h-56" />

				{/* Catalog link*/}
				<a
					href="/catalog"
					className="font-header absolute top-3/5 left-1/2 z-20 -translate-x-1/2 -translate-y-1/3 transform text-3xl underline underline-offset-[16px] transition-all duration-300 group-hover:scale-110 xl:text-[34px]"
				>
					Ver Catálogo
				</a>

				{/* Orange rectangle shape */}
				<span className="bg-accent-300 absolute left-1/2 z-[2] h-36 w-1/12 origin-bottom -translate-x-1/2 transform transition-all duration-300 group-hover:scale-y-110 xl:h-48" />
			</div>

			<div className="border-foreground-500 col-span-3 row-start-2 flex w-full items-end justify-center gap-4 border-b p-4 sm:col-span-4 sm:col-start-1 xl:col-span-3 xl:col-start-1 xl:row-start-2">
				<div className="relative h-24 w-12 sm:h-30 sm:w-16 xl:h-48 xl:w-24">
					<Image className="" src="/logo.svg" alt="logo" fill />
				</div>
				<h1 className="font-display text-3xl tracking-[0.2em] sm:text-6xl xl:text-7xl">ILLCERAMICS</h1>
			</div>

			<div className="border-foreground-500 relative col-span-2 h-[322px] border-r border-b sm:col-span-1 sm:col-start-3 sm:row-span-2 sm:row-start-3 sm:h-auto xl:col-start-3 xl:row-span-2 xl:row-start-3 xl:h-[400px] xl:border-r-0 xl:border-b">
				<Image src="/images/landing-image-1.png" fill alt="landing image 1" className="object-cover" />
			</div>

			<div className="border-foreground-500 relative col-span-1 flex items-center justify-center gap-8 border-b sm:col-start-2 sm:row-start-4 sm:border-r sm:border-l sm:p-4 xl:col-start-5 xl:row-start-2 xl:justify-center xl:border-r-0 xl:border-l-0">
				<div className="flex flex-col items-center justify-center gap-8 sm:flex-row xl:flex-col">
					<a className="transition duration-300 hover:scale-110" href="https://www.instagram.com/illceramics/">
						<Instagram className="h-12 w-12 stroke-1" />
					</a>
					<a className="transition duration-300 hover:scale-110" href="https://www.instagram.com/illceramics/">
						<Mail className="h-12 w-12 stroke-1" />
					</a>
				</div>
				<Image src="/images/cell-decor.png" width={160} height={160} alt="cell decoration" className="relative -right-24 hidden xl:block" />
			</div>

			<p className="font-paragraph border-foreground-500 z-10 col-span-3 flex items-center border-b p-6 italic sm:col-span-1 sm:col-start-3 sm:row-start-6 sm:border-r xl:col-span-2 xl:col-start-4 xl:row-start-5 xl:border-r-0 xl:border-b-0 xl:text-xl">
				{' '}
				Parrafo breve sobre la empresa. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
				magna aliqua. Ut enim ad minim{' '}
			</p>

			<div className="border-foreground-500 hover:bg-background-secondary-400 group box-border flex flex-col items-center justify-center border-b hover:cursor-pointer hover:border-l sm:col-start-3 sm:row-start-5 sm:border-r xl:col-span-2 xl:col-start-4 xl:row-span-2 xl:row-start-3 xl:border-r-0">
				<div className="font-header -rotate-90 transform text-2xl whitespace-nowrap underline underline-offset-8 transition duration-300 group-hover:scale-105 sm:rotate-none sm:transform-none xl:text-4xl">
					Encargos personalizados
				</div>

				{/*Decoration for desktop*/}
				<Image
					className="hidden transition duration-300 group-hover:scale-105 xl:flex"
					src="/images/footer-decoration.png"
					width={200}
					height={200}
					alt="decoration Image"
				/>
				<h4 className="font-paragraph relative hidden p-2 text-center italic transition duration-300 group-hover:scale-105 sm:block sm:text-sm xl:bottom-8 xl:text-lg">
					Todos nuestros productos están hechos a mano desde principio a fin
				</h4>
			</div>

			<div className="border-foreground-500 relative z-10 col-span-2 h-[322px] border-b border-l sm:col-span-1 sm:col-start-2 sm:row-span-2 sm:row-start-5 sm:border-r xl:col-start-4 xl:row-span-1 xl:row-start-2 xl:h-auto">
				<Image src="/images/landing-image-2.png" fill alt="landing image 1" className="object-cover" />
			</div>

			{/*desktop lines*/}
			<span className="border-foreground-500 col-start-1 row-span-2 row-start-3 hidden h-full border-b xl:block" />

			{/*tablet lines*/}
			<span className="border-foreground-500 col-start-1 row-start-2 hidden h-full border-b sm:block xl:hidden" />
			<span className="border-foreground-500 col-start-1 row-start-4 hidden h-full border-b sm:block xl:hidden" />
			<span className="border-foreground-500 col-start-1 row-start-6 hidden h-full border-b sm:block xl:hidden" />

			<span className="border-foreground-500 col-start-4 row-start-2 hidden h-full border-b sm:block xl:hidden" />
			<span className="border-foreground-500 col-start-4 row-start-4 hidden h-full border-b sm:block xl:hidden" />
			<span className="border-foreground-500 col-start-4 row-start-6 hidden h-full border-b sm:block xl:hidden" />
		</>
	)
}

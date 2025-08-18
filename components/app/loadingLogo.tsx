import { motion, Transition } from 'framer-motion'
// Create staggered animations for each path
const createPathTransition = (delay: number): Transition => ({
	duration: 1.5,
	delay: 0.1 + delay,
	ease: 'easeInOut'
})

export default function LoadingLogo() {
	return (
		<div className="animate-out flex min-h-screen min-w-screen flex-col items-center justify-center">
			<motion.svg
				width="176"
				height="344"
				viewBox="0 0 88 172"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				initial={{ opacity: 0, scale: 0.5 }}
				animate={{ opacity: 1, scale: 1 }}
				exit={{ opacity: 0, scale: 0.95 }}
				transition={{ duration: 0.5 }}
			>
				{/* Path 1 - Main body structure */}
				<motion.path
					d="M20.5256 159.543C18.0256 159.543 16.5257 159.043 16.5257 153.043C16.5257 147.043 16.5257 105.043 16.5257 99.0426C16.5257 95.674 16.1785 93.812 16.7767 93.0426M20.5256 159.543C20.5256 164.543 22.0256 164.043 24.5256 164.043H46.5257M20.5256 159.543C30.5256 160.043 35.1683 160.802 46.5257 160.543M46.5257 94.0426C38.5256 94.0426 25.6273 94.2631 20.5257 93.0426C18.2883 92.5073 17.244 92.4415 16.7767 93.0426M22.5256 91.0426C19.5256 91.0426 17.5455 91.2201 16.7767 93.0426M63.5256 89.5427C73.5927 90.1998 74.5256 91.0428 76.5256 94.0426"
					stroke="rgb(101, 57, 53)"
					strokeWidth="1"
					fill="none"
					strokeLinecap="round"
					strokeLinejoin="round"
					initial={{ pathLength: 0, opacity: 0 }}
					animate={{ pathLength: 1, opacity: 0.8 }}
					transition={createPathTransition(0)}
				/>

				{/* Path 2 - Right side structure */}
				<motion.path
					d="M72.5257 159.557C75.0256 159.557 76.5255 159.06 76.5255 153.097V99.4296C76.5255 93.4666 77.6271 92.2536 72.5256 93.4666C67.424 94.6796 54.5258 94.0427 46.5257 94.0427M72.5257 159.557C72.5257 164.526 71.0257 164.029 68.5257 164.029H46.5257M72.5257 159.557C62.5257 160.054 57.8831 160.801 46.5257 160.543"
					stroke="rgb(101, 57, 53)"
					strokeWidth="1"
					fill="none"
					strokeLinecap="round"
					strokeLinejoin="round"
					initial={{ pathLength: 0, opacity: 0 }}
					animate={{ pathLength: 1, opacity: 0.8 }}
					transition={createPathTransition(0.3)}
				/>

				{/* Path 3 - Middle section */}
				<motion.path
					d="M11.0257 83.5427C20.0258 89.5427 21.0257 90.0427 26.5258 93.5428H47.0257L50.284 93.5428C53.784 93.5428 63.7511 91.867 65.0258 88.0427C69.0258 76.0427 70.0258 75.5427 72.5257 59.0428M11.0257 83.5427C9.52564 78.5427 73.5257 55.0427 72.5257 59.0428M11.0257 83.5427C14.0256 71.0427 19.5258 64.5427 23.0258 57.5428M72.5257 59.0428C61.0258 53.0427 58.0258 52.5427 46.0257 49.0427M23.0258 57.5428C26.5257 50.5428 41.5257 49.5427 46.0257 49.0427M23.0258 57.5428C20.8574 52.6612 20.0257 50.5427 21.0257 46.0427C25.0256 39.5427 31.0256 38.0427 42.5256 38.0427C45.5256 41.0427 45.0257 43.0427 46.0257 49.0427"
					stroke="rgb(101, 57, 53)"
					strokeWidth="1"
					fill="none"
					strokeLinecap="round"
					strokeLinejoin="round"
					initial={{ pathLength: 0, opacity: 0 }}
					animate={{ pathLength: 1, opacity: 0.8 }}
					transition={createPathTransition(0.6)}
				/>

				{/* Path 4 - Top/head section */}
				<motion.path
					d="M12.4998 37.0428C10.5 23.0428 21.9991 12.0428 40.499 10.5428C42.5429 10.0187 43.5501 9.45285 45 8.04272C46.0921 4.73953 46.7763 3.40882 47.999 1.04276C50.5 0.542738 60.5 4.54272 62 7.04272C63.5 9.54272 55 14.5427 55 14.5427C54.1287 16.2692 53.8237 17.25 53.999 19.0428C56.5 25.5427 49 32.5428 43.5 39.0428M12.4998 37.0428C15.5094 40.9357 17.5563 42.6147 22 44.5428M12.4998 37.0428C12 35.0428 22 41.0428 24.5 42.5428"
					stroke="rgb(101, 57, 53)"
					strokeWidth="1"
					fill="none"
					strokeLinecap="round"
					strokeLinejoin="round"
					initial={{ pathLength: 0, opacity: 0 }}
					animate={{ pathLength: 1, opacity: 0.8 }}
					transition={createPathTransition(0.9)}
				/>
			</motion.svg>
			<motion.div
				// reveals content from left to right
				initial={{ clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)' }}
				whileInView={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
				viewport={{ once: true }}
				transition={{ duration: 1.5 }}
			>
				<h1 className="font-display text-3xl tracking-[0.2em] sm:text-6xl xl:text-7xl">ILLCERAMICS</h1>
			</motion.div>
		</div>
	)
}

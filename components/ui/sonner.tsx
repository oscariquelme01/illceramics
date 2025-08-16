'use client'

import { useTheme } from 'next-themes'
import { Toaster as Sonner, ToasterProps } from 'sonner'

const Toaster = ({ ...props }: ToasterProps) => {
	const { theme = 'system' } = useTheme()

	return (
		<Sonner
			theme={theme as ToasterProps['theme']}
			className="toaster group"
			richColors
			style={
				{
					'--normal-bg': 'var(--popover)',
					'--normal-text': 'var(--popover-foreground)',
					'--normal-border': 'var(--border)',
					'--error-bg': 'var(--background-primary-500)',
					'--error-text': 'var(--foreground-500)',
					'--success-bg': 'var(--background-secondary-500)',
					'--success-text': 'var(--foreground-400)'
				} as React.CSSProperties
			}
			{...props}
		/>
	)
}

export { Toaster }

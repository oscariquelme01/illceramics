import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import Sidebar from '@/components/app/adminSidebar'

import '@/app/globals.css'

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<SidebarProvider>
			<Sidebar />
			<main className="w-full">
				<SidebarTrigger />
				{children}
			</main>
		</SidebarProvider>
	)
}

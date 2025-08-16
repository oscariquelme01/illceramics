import { PackageSearch, Users, LayoutList } from 'lucide-react'

import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem
} from '@/components/ui/sidebar'

// Menu items.
const items = [
	{
		title: 'Usuarios',
		url: '/admin/users',
		icon: Users
	},
	{
		title: 'Productos',
		url: '/admin/products',
		icon: PackageSearch
	},
	{
		title: 'Pedidos',
		url: '/admin/orders/',
		icon: LayoutList
	}
]

export default function AdminSidebar() {
	return (
		<Sidebar>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Administacrión</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{items.map(item => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild>
										<a href={item.url}>
											<item.icon />
											<span>{item.title}</span>
										</a>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	)
}

import { PackageSearch, Users, LayoutList } from 'lucide-react'

import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarFooter
} from '@/components/ui/sidebar'
import { Button } from '../ui/button'

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

type adminSidebarProps = {
	name: string
}

const AdminSidebar: React.FC<adminSidebarProps> = ({ name }) => {
	return (
		<Sidebar>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel className="text-accent-600 my-4 text-lg">Hola {name}!</SidebarGroupLabel>
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
			<SidebarFooter>
				<Button>Cerrar Sessión</Button>
			</SidebarFooter>
		</Sidebar>
	)
}

export default AdminSidebar

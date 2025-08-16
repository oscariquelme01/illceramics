// app/admin/page.tsx
import { authClient } from '@/lib/authClient'
import { redirect } from 'next/navigation'

export default function AdminPage() {
	const { data: session } = authClient.useSession()

	if (!session) redirect('/admin/login')
	if (!session.user.role?.includes('admin')) redirect('/admin/login')

	redirect('/admin/users')
}

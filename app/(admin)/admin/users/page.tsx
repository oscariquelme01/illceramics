import { auth } from '@/lib/auth'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

import { headers } from 'next/headers'

export default async function Users() {
	// TODO: PAGINATION!!
	const pageSize = 10
	const currentPage = 1

	const users = await auth.api.listUsers({
		query: {
			limit: pageSize,
			offset: (currentPage - 1) * pageSize
		},
		// This endpoint requires session cookies.
		headers: await headers()
	})

	return (
		<Table className="m-8 mx-auto w-full max-w-xl">
			<TableHeader>
				<TableRow>
					<TableHead className="w-[100px]">Nombre</TableHead>
					<TableHead>Email</TableHead>
					<TableHead>¿Verificado?</TableHead>
					<TableHead className="text-right">Fecha de creación</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{users.users.map(user => (
					<TableRow key={user.id}>
						<TableCell className="font-medium">{user.name}</TableCell>
						<TableCell>{user.email}</TableCell>
						<TableCell className="text-center">{user.emailVerified ? 'Si' : 'No'}</TableCell>
						<TableCell className="text-right">{user.createdAt.toLocaleString()}</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	)
}

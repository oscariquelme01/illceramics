// scripts/seed-admin.ts
import { auth } from '@/lib/auth'

async function createInitialAdmin() {
	try {
		const newUser = await auth.api.createUser({
			body: {
				email: process.env.ADMIN_EMAIL!, // required
				password: process.env.ADMIN_PASSWORD!, // required
				name: 'Oscar Riquelme', // required
				role: 'admin'
			}
		})

		if (newUser) console.log('New user:', newUser)
	} catch (err) {
		console.error('Error creating admin user:', err)
	} finally {
		process.exit(0)
	}
}

createInitialAdmin()

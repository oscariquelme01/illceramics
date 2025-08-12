export const runtime = 'nodejs'

import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { db } from '@/database' // your drizzle instance

import { sendVerificationEmail } from '@/lib/email'

import * as schema from '@/database/schema'

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: 'pg', // or "mysql", "sqlite"
		schema: schema
	}),
	emailAndPassword: {
		enabled: true,
		autoSignIn: true,
		minPasswordLength: 8,
		maxPasswordLength: 20,
		requireEmailVerification: true //It does not allow user to login without email verification [!code highlight]
	},
	emailVerification: {
		sendOnSignUp: true, // Automatically sends a verification email at signup
		requireEmailVerification: true,
		autoSignInAfterVerification: true, // Automatically signIn the user after verification
		sendVerificationEmail: async ({ user, url }) => {
			console.log('SENDING EMAIL TO ' + user.email + ' WITH URL ' + url)
			const result = await sendVerificationEmail({
				name: user.name,
				to: user.email,
				subject: 'Verifica tu dirección de correo electrónico',
				url: url
			})
			const resultData = await result.json()
			console.log('RESULT', resultData)
		}
	}
})

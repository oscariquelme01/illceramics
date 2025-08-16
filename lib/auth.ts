export const runtime = 'nodejs'

import { betterAuth } from 'better-auth'
import { admin } from 'better-auth/plugins'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { db } from '@/database' // your drizzle instance

import { sendVerificationEmail } from '@/lib/email'

import * as schema from '@/database/schema'

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: 'pg', // or "mysql", "sqlite"
		schema: schema
	}),
	socialProviders: {
		google: {
			clientId: process.env.GOOGLE_AUTH_CLIENT!,
			clientSecret: process.env.GOOGLE_AUTH_SECRET!
		}
	},
	emailAndPassword: {
		enabled: true,
		autoSignIn: true,
		minPasswordLength: 8,
		maxPasswordLength: 20,
		requireEmailVerification: true //It does not allow user to login without email verification
	},
	emailVerification: {
		sendOnSignUp: true, // Automatically sends a verification email at signup
		requireEmailVerification: true,
		autoSignInAfterVerification: true, // Automatically signIn the user after verification
		sendVerificationEmail: async ({ user, url }) => {
			const result = await sendVerificationEmail({
				name: user.name,
				to: user.email,
				subject: 'Verifica tu dirección de correo electrónico',
				url: url
			})
			const resultData = await result.json()
			//TODO: show some error if the mail was not sent properly
			console.log('RESULT', resultData)
		}
	},
	plugins: [admin()]
})

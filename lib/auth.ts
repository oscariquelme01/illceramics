import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { db } from '@/database' // your drizzle instance

import * as schema from '@/database/schema'

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: 'pg', // or "mysql", "sqlite"
		schema: schema
	}),
	emailAndPassword: {
		enabled: true
	}
})

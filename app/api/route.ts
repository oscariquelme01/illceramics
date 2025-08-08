import { main } from '@/database'

export async function GET() {
	await main()

	return Response.json({ message: 'hello world!!' })
}

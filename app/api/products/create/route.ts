import { headers } from 'next/headers'
import { auth } from '@/lib/auth'

// import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
// import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
//
// const s3 = new S3Client({
// 	region: process.env.AWS_REGION,
// 	credentials: {
// 		accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
// 		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
// 	}
// })
//
// async function handler(req: NextApiRequest, res: NextApiResponse) {
// 	const { filename, filetype } = req.body
//
// 	if (!filename || !filetype) return res.status(400).json({ error: 'Missing params' })
//
// 	const key = `products/${filename}`
//
// 	const command = new PutObjectCommand({
// 		Bucket: process.env.S3_BUCKET_NAME,
// 		Key: key,
// 		ContentType: filetype
// 	})
//
// 	const url = await getSignedUrl(s3, command, { expiresIn: 300 }) // URL valid for 5 minutes
//
// 	res.status(200).json({ uploadUrl: url, key })
// }

export async function POST() {
	const session = await auth.api.getSession({
		query: {
			disableCookieCache: true
		},
		headers: await headers() // pass the headers
	})

	if (!session || !session?.user.role?.includes('admin'))
		return Response.json({
			status: 403,
			message: 'You must be logged in as an admin before creating a product'
		})

	return Response.json({ message: 'Hello World' })
}

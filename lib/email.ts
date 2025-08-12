import { Resend } from 'resend'
import { EmailVerificationTemplate } from '@/components/emailTemplates/verificationTemplate'

const resend = new Resend(process.env.RESEND_API_KEY)

const noReplyEmail = 'no-reply@illceramics.com'

export async function sendVerificationEmail(emailData: { to: string; subject: string; url: string }) {
	try {
		const { data, error } = await resend.emails.send({
			from: noReplyEmail,
			to: [emailData.to],
			subject: emailData.subject,
			react: EmailVerificationTemplate({ firstName: 'John', verificationUrl: emailData.url })
		})

		if (error) {
			return Response.json({ error }, { status: 500 })
		}

		return Response.json(data)
	} catch (error) {
		return Response.json({ error }, { status: 500 })
	}
}

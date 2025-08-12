import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const noReplyEmail = 'no-reply@illceramics.com'

export async function sendVerificationEmail(emailData: { to: string; subject: string; url: string; name: string }) {
	try {
		const { data, error } = await resend.emails.send({
			from: noReplyEmail,
			to: [emailData.to],
			subject: emailData.subject,
			// can't use react: because it's not supported on edge runtime :( can't use templates
			html: `
        <div>
          <h1>¡Hola, ${emailData.name}!</h1>
          <p>Haz click en el siguiente enlace para verificar tu dirección de correo electrónico.</p>
          <a href="${emailData.url}">Verificar Email</a>
          <p>¡Muchas gracias por confiar en nosotros!</p>
        </div>
      `
		})

		if (error) {
			console.error('Resend error:', error) // Add logging
			return Response.json({ error }, { status: 500 })
		}

		return Response.json(data)
	} catch (error) {
		console.error('Catch error:', error) // Add logging
		return Response.json({ error }, { status: 500 })
	}
}

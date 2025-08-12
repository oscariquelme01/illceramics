import * as React from 'react'

interface VerificationEmailTemplateProps {
	firstName: string
	verificationUrl: string
}

export function EmailVerificationTemplate({ verificationUrl, firstName }: VerificationEmailTemplateProps) {
	return (
		<div>
			<h1>¡Hola, {firstName}!</h1>
			<div>Haz click en el siguiente enlace para verificar tu dirección de correo electrónico.</div>
			<span>{verificationUrl}</span>
			<div>¡Muchas gracias por confiar en nosotros!</div>
		</div>
	)
}

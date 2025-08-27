'use client'

import CreateProductForm from '@/components/app/createProductForm'
import React from 'react'

export async function handler() {
	const response = await fetch('/api/products/create', {
		method: 'POST'
	})

	console.log(await response.json())
}

function page() {
	return (
		<div className="m-8 flex items-center justify-start">
			{/* Product creation */}
			<section>
				<h3 className="my-4 text-3xl font-bold">Crear Producto</h3>
				<CreateProductForm onSubmit={async () => console.log('yes daddy i am cumming')} />
			</section>
		</div>
	)
}

export default page

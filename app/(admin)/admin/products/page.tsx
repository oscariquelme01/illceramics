'use client'

import CreateProductForm from '@/components/app/createProductForm'
import React from 'react'

function page() {
	return (
		<div className="m-8 flex items-center justify-start">
			{/* Product creation */}
			<section>
				<h3 className="my-4 text-3xl font-bold">Crear Producto</h3>
				<CreateProductForm />
			</section>
		</div>
	)
}

export default page

'use client'

import UpdateProductForm from '@/components/app/productForm'
import { Product } from '@/database/schema'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const ProductPage = () => {
	const params = useParams<{ productId: string }>()
	const productId = params.productId
	const [productDetails, setProductDetails] = useState<Product | null>(null)

	useEffect(() => {
		const fetchProductDetails = async () => {
			try {
				const productDetailsResponse = await fetch(`/api/products?productId=${productId}`)
				const data = (await productDetailsResponse.json()) as { productDetails: Product[] }

				if (productDetailsResponse.ok) setProductDetails(data.productDetails[0])
			} catch (error) {
				console.error('Failed to fetch product details:', error)
			}
		}

		// to avoid a null productId fetch
		if (productId) fetchProductDetails()
	}, [productId])

	return (
		<div>
			<h1>Name: {productDetails?.name}</h1>
			<p>Product ID: {productId}</p>
			{productDetails && <UpdateProductForm details={productDetails} />}
		</div>
	)
}

export default ProductPage

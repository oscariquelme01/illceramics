'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

import ProductForm from '@/components/app/productForm'
import React, { useEffect, useState } from 'react'
import { Spinner } from '@/components/ui/shadcn-io/spinner'
import { Product } from '@/database/schema'
import { Edit, Trash } from 'lucide-react'
import Link from 'next/link'

export default function Page() {
	const [products, setProducts] = useState<Array<Product>>([])
	const [loading, setLoading] = useState(false)

	// TODO: delete element
	// const handleDeleteElement = (productId: string) => {
	//
	// }

	// TODO: PAGINATION!!
	// const pageSize = 10
	// const currentPage = 1

	useEffect(() => {
		const getProducts = async () => {
			setLoading(true)
			const getProductsResponse = await fetch('/api/products', {
				method: 'GET'
			})

			const allProducts = await getProductsResponse.json()
			setProducts(allProducts.products)
			setLoading(false)
		}

		getProducts()
	}, [])

	return (
		<div className="m-8 flex flex-col items-start justify-around xl:flex-row">
			{/* Product creation */}
			<section className="w-full">
				<h3 className="my-4 text-3xl font-bold">Crear Producto</h3>
				<ProductForm />
			</section>

			<section className="mt-8 w-full xl:mt-0">
				<h3 className="my-4 text-3xl font-bold">Consultar y modificar Productos</h3>
				{loading ? (
					<Spinner />
				) : (
					<Table className="w-full max-w-xl">
						<TableHeader>
							<TableRow>
								<TableHead className="w-[100px] font-bold">Nombre</TableHead>
								<TableHead className="w-auto text-right font-bold">Precio</TableHead>
								<TableHead className="w-full text-right font-bold">Acciones</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{products.map(product => (
								<TableRow key={product.id} className="hover:bg-background-secondary-500/50 transition-colors">
									<TableCell className="font-medium">{product.name}</TableCell>
									<TableCell className="text-right">{product.price}€</TableCell>
									<TableCell className="flex justify-end gap-4">
										<Link href={`/admin/products/${product.id}`}>
											<Edit className="relative top-[1px] hover:cursor-pointer" />
										</Link>
										<Trash className="hover:cursor-pointer" onClick={() => handleDeleteElement(product.id)} />
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				)}
			</section>
		</div>
	)
}

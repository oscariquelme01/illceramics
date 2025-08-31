'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

import ProductForm from '@/components/app/productForm'
import React, { useEffect, useState } from 'react'
import { Spinner } from '@/components/ui/shadcn-io/spinner'
import { Product } from '@/database/schema'
import { Edit, Trash } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle
} from '@/components/ui/alert-dialog'

export default function Page() {
	const [products, setProducts] = useState<Array<Product>>([])
	const [loading, setLoading] = useState(false)

	const [productToDelete, setProductToDelete] = useState<string | null>(null)
	const [showDeleteModal, setShowDeleteModal] = useState(false)

	const handleDeleteClick = (productId: string) => {
		setProductToDelete(productId)
		setShowDeleteModal(true)
	}

	const confirmDelete = async () => {
		if (productToDelete === null) return

		await handleDeleteElement(productToDelete)
		setShowDeleteModal(false)
		setProductToDelete(null)
	}

	const cancelDelete = () => {
		setShowDeleteModal(false)
		setProductToDelete(null)
	}

	const handleDeleteElement = async (productId: string) => {
		const product = products.find(product => product.id === productId)

		if (!product) {
			toast.error('Error al borrar el producto')
			return
		}

		await Promise.all(
			product.images?.map(imageKey =>
				fetch('/api/products/images', {
					method: 'DELETE',
					body: JSON.stringify({
						imageKey,
						productId
					})
				})
			) ?? []
		)

		const deleteResult = await fetch('/api/products', {
			method: 'DELETE',
			body: JSON.stringify({ productId })
		})

		if (deleteResult.ok) toast.success('Producto borrado correctamente')
		else toast.error('Error al borrar el producto')

		// update the product state variable
		setProducts(products.filter(product => product.id != productId))
	}

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
										<Trash className="hover:cursor-pointer" onClick={() => handleDeleteClick(product.id)} />
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				)}
			</section>

			<AlertDialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
				<AlertDialogContent className="bg-background-primary-100 text-foreground-500">
					<AlertDialogHeader>
						<AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
						<AlertDialogDescription>
							Esta acción no se puede deshacer. La imagen será eliminada permanentemente del producto.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel onClick={cancelDelete}>Cancelar</AlertDialogCancel>
						<AlertDialogAction onClick={confirmDelete} className="bg-destructive text-foreground-500 hover:bg-destructive/90">
							Eliminar
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	)
}

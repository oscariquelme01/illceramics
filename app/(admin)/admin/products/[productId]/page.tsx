'use client'

import UpdateProductForm from '@/components/app/productForm'
import { Spinner } from '@/components/ui/shadcn-io/spinner'
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
import { Product } from '@/database/schema'
import { X } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

const ProductPage = () => {
	const params = useParams<{ productId: string }>()
	const productId = params.productId
	const [productDetails, setProductDetails] = useState<Product | null>(null)
	const [imageUrls, setImageUrls] = useState<string[]>([])
	const [showDeleteModal, setShowDeleteModal] = useState(false)
	const [imageToDelete, setImageToDelete] = useState<number | null>(null)

	const handleDeleteClick = (index: number) => {
		setImageToDelete(index)
		setShowDeleteModal(true)
	}

	const confirmDelete = async () => {
		if (imageToDelete === null) return

		await removeImage(imageToDelete)
		setShowDeleteModal(false)
		setImageToDelete(null)
	}

	const cancelDelete = () => {
		setShowDeleteModal(false)
		setImageToDelete(null)
	}

	const removeImage = async (index: number) => {
		if (!productDetails) {
			toast.error('No se pudo obtener el Id de la imagen a borrar. Prueba mas adelante')
			return
		}
		const imageKey = productDetails.images![index]
		if (!imageKey) {
			toast.error('No se pudo obtener el Id de la imagen a borrar. Prueba mas adelante')
			return
		}
		const response = await fetch('/api/products/images', {
			method: 'DELETE',
			body: JSON.stringify({ imageKey, productId })
		})
		if (response.ok) {
			toast.success('Imagen borrada correctamente del repositorio')
			// Remove the image from local state
			setImageUrls(prev => prev.filter((_, i) => i !== index))
			// Update product details to remove the image key
			setProductDetails(prev =>
				prev
					? {
							...prev,
							images: prev.images!.filter((_, i) => i !== index)
						}
					: null
			)
		} else {
			toast.error('Error al borrar la imagen')
		}
	}

	useEffect(() => {
		const fetchProductDetails = async () => {
			try {
				const productDetailsResponse = await fetch(`/api/products?productId=${productId}`)
				const data = (await productDetailsResponse.json()) as { productDetails: Product[] }
				if (productDetailsResponse.ok) setProductDetails(data.productDetails[0])
				// get the presigned urls from s3 buckets to show currently uploaded images
				const newImageUrls = []
				for (const imageKey of data.productDetails[0].images!) {
					const imageUrlResponse = await fetch(`/api/products/images?imageKey=${imageKey}`, {
						method: 'GET'
					})
					const imageData = (await imageUrlResponse.json()) as { url: string; status: number }
					newImageUrls.push(imageData.url)
				}
				setImageUrls(newImageUrls)
			} catch (error) {
				console.error('Failed to fetch product details:', error)
			}
		}
		// to avoid a null productId fetch
		if (productId) fetchProductDetails()
	}, [productId])

	return (
		<div className="flex w-full flex-col items-center justify-center gap-8">
			<h1 className="text-2xl font-bold">{productDetails?.name}</h1>
			<div>(id: {productId})</div>
			<div className="flex w-full flex-col items-center justify-center gap-16 xl:flex-row xl:items-start">
				{productDetails ? <UpdateProductForm details={productDetails} /> : <Spinner />}
				<div>
					<h2 className="text-xl font-bold">Imágenes del producto</h2>
					<div className="mt-8 flex flex-col gap-8">
						{imageUrls.map((imageUrl, index) => (
							<div key={index} className="group relative">
								<img src={imageUrl} alt={`Preview ${index + 1}`} className="h-32 w-full rounded-lg border object-cover" />
								<button
									type="button"
									onClick={() => handleDeleteClick(index)}
									className="bg-destructive text-destructive-foreground absolute -top-2 -right-2 rounded-full p-1 opacity-0 transition-opacity group-hover:opacity-100"
								>
									<X size={16} />
								</button>
							</div>
						))}
					</div>
				</div>
			</div>

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
export default ProductPage

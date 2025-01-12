import { toast } from 'react-toastify'
import { useState, useContext } from 'react'
import { ManagerStorage } from '../service/manager-storage'
import { StoreContext } from '../context/product-store'

export const useDeleteProduct = (productId) => {
	const storage = new ManagerStorage()
	const { setCounter } = useContext(StoreContext)

	const [open, setOpen] = useState(false)
	const [fieldValues, setFieldValues] = useState({
		nomeProduto: '',
		descricaoProduto: '',
		preco: '',
	})

	const onDelete = async () => {
		try {
			const response = storage.delete('produtos', productId)
			if (response) {
				toast.success('Produto deletado com sucesso.', {
					theme: "dark",
				})
				setCounter(storage.getAll('produtos'))
				clearInputs();
			}
		} catch (error) {
			console.error(error)
		}
	}
	// Função para resetar campos
	const clearInputs = () => {
		setFieldValues({
			nomeProduto: '',
			descricaoProduto: '',
			preco: '',
		})
	}

	const getProductById = () => {
		try {
			const products = JSON.parse(storage.getAll('produtos'))
			const { id, nomeProduto, descricaoProduto, preco } = products.filter((product) => product.id === productId)[0]
			setFieldValues({
				id,
				nomeProduto,
				descricaoProduto,
				preco,
			})
		} catch (err) {
			console.error(err)
			toast.error('Produto não encontrado', {
				theme: 'dark'
			})
		}
	}

	const formatPriceProduct = (price) => {
		let content = parseInt(price)
		return content.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
	}

	const handleOpen = () => {
		setOpen(true)
		getProductById()
	}
	const handleClose = () => setOpen(false)

	return {
		handleOpen, handleClose, formatPriceProduct, fieldValues, open, onDelete
	}
}
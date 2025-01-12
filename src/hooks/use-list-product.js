
import { toast } from 'react-toastify'
import { useState, useEffect, useContext } from 'react'
import { ManagerStorage } from '../service/manager-storage'
import { StoreContext } from '../context/product-store'

export const useListProduct = () => {
	const storage = new ManagerStorage()
	const [rows, setRows] = useState([])
	const { counter } = useContext(StoreContext)

	useEffect(() => {
		getAllProducts()
	}, [counter])

	const getAllProducts = () => {
		try {
			const response = storage.getAll('produtos');
			let products = response ? JSON.parse(response) : []
			if (response.length > 0) setRows(products)
		} catch (err) {
			toast.error('Erro ao listar os produtos', {
				theme: 'dark'
			})
			console.error(err)
		}
	}

	const newSliceArr = rows.slice()
	const sortedRowsByLastedId = newSliceArr
		.sort((a, b) => b.id - a.id)
		.map((product) => {
			return {
				id: product.id,
				nomeProduto: product.nomeProduto,
				descricaoProduto: product.descricaoProduto,
				preco: `${formatProductPrice(parseInt(product.preco))}`
			}
		})

	function formatProductPrice(price) {
		return price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
	}

	return {
		sortedRowsByLastedId
	}
}
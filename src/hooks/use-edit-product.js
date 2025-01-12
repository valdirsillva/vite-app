import { toast } from 'react-toastify'
import { useState, useContext } from 'react'
import { StoreContext } from '../context/product-store'
import { ManagerStorage } from '../service/manager-storage';
import { RequiredFieldValidation } from '../utils/validation/required-field-validation'

export const useEditProduct = (productId) => {
  const storage = new ManagerStorage();
	const { setCounter } = useContext(StoreContext)

	const [open, setOpen] = useState(false)

	const [fieldValues, setFieldValues] = useState({
		nomeProduto: '',
		descricaoProduto: '',
		preco: '',
	})

	const handleChangeValues = (e) => {
		const fieldName = e.target.name
		const fieldValue = e.target.value

		setFieldValues((current) => {
			return {
				...current,
				[fieldName]: fieldValue,
			}
		})
	}

	const onEdit = async () => {
		try {
			const fields = ['nomeProduto', 'preco']

			/**
			* Valida campos obrigatórios
			*/
			if (RequiredFieldValidation.validate(fieldValues, fields)) {
				const response = storage.update('produtos', fieldValues, productId);

				if (response) {
					toast.success('Produto editado com sucesso.', {
						theme: "dark",
					})
					setCounter(storage.getAll('produtos'))
					clearInputs();
				}
			}
		} catch (error) {
			console.error(error)
			toast.error('Erro ao editar o produto.', {
				theme: "dark",
			})
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

	const handleOpen = () => {
		setOpen(true)
		getProductById()
	}
	const handleClose = () => setOpen(false)

  return {
		fieldValues, handleChangeValues, handleClose, handleOpen,open, onEdit
  }
}
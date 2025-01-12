import { useState, useContext } from 'react'
import { StoreContext } from '../context/product-store'

import { toast, ToastContainer } from 'react-toastify'
import { RequiredFieldValidation } from '../utils/validation/required-field-validation';
import { ManagerStorage } from '../service/manager-storage';

export const useCreateProduct = () => {

  const { setCounter } = useContext(StoreContext);

	const [open, setOpen] = useState(false)
	const handleOpen = () => setOpen(true)
	const handleClose = () => setOpen(false)

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

	const onSave = async () => {
		try {
			const storage = new ManagerStorage();
			const fields = ['nomeProduto', 'descricaoProduto', 'preco'] 

			if (RequiredFieldValidation.validate(fieldValues, fields)) {
				const response = storage.add('produtos', fieldValues);

				if (response) {
					toast.success('Produto cadastrado com sucesso.', {
						theme: "dark",
					})
					setCounter(storage.getAll('produtos'))
					clearInputs();
				}
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

  return {
		fieldValues, handleChangeValues, clearInputs, onSave, handleOpen, handleClose, open, setOpen, setCounter
  }
}
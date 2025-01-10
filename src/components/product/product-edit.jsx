import { useContext, useState } from 'react'
import { toast } from 'react-toastify'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'

import { Edit } from '@mui/icons-material'
import { TextField } from '@mui/material'
import { ManagerStorage } from '../../service/manager-storage'
import { StoreContext } from '../../context/product-store'
import { CustomInput, TextFieldCustom } from '../../utils/styles/custom-input'
import { RequiredFieldValidation } from '../../utils/validation/required-field-validation'

export const ProductEdit = ({ productId }) => {
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

	return (
		<div >
			<Edit
				fontSize='medium'
				titleAccess='Editar produto'
				onClick={handleOpen}
				className='cursor-pointer'
			/>
			<Modal
				open={open}
				// open
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
				className='w-full flex items-center justify-center'
			>
				<Box className="md:w-[550px] sm:w-full flex flex-col bg-black border-solid border-[#c1c6cf4a] rounded-sm p-8 transform">
					<Typography className="uppercase font-semibold text-orange-400" id="modal-modal-title" variant="h6" component="h2">
						Editar produto
					</Typography>

					<div className="flex flex-col mt-10 gap-4">
						<div className="w-12/12">
							<TextField
								id="nomeProduto"
								name="nomeProduto"
								// label="Produto"
								type="text"
								value={fieldValues.nomeProduto}
								autoComplete="current-password"
								sx={TextFieldCustom}
								className={`${CustomInput}`}
								placeholder="Nome do produto"
								onChange={handleChangeValues}
							/>
						</div>

						<div className="w-12/12">
							<TextField
								id="descricaoProduto"
								name="descricaoProduto"
								label="Descrição"
								type="text"
								value={fieldValues.descricaoProduto}
								autoComplete="current-description"
								sx={TextFieldCustom}
								className={`${CustomInput}`}
								placeholder="Descrição"
								onChange={handleChangeValues}
							/>
						</div>

						<div className="w-12/12">
							<TextField
								id="precoProduto"
								name="preco"
								label="Preço"
								type="text"
								value={fieldValues.preco}
								autoComplete="current-description"
								sx={TextFieldCustom}
								className={`${CustomInput}`}
								placeholder="Preço"
								onChange={handleChangeValues}
							/>
						</div>

						<div className="w-12/12 flex gap-5">
							<button
								type="button"
								onClick={handleClose}
								className={`flex justify-center border-2 border-[#ef0b0b] rounded-md transparent  px-8 py-3 text-sm font-semibold leading-6 text-white shadow-sm`}
							>
								Cancelar
							</button>

							<button
								type="button"
								onClick={onEdit}
								// disabled={!isLoginFormValid}
								className={`flex justify-center rounded-md bg-[#04b200] px-8 py-3 border-2 border-[#04b200] text-sm font-semibold leading-6 text-white shadow-sm`}
							>
								Salvar
							</button>
						</div>
					</div>
				</Box>
			</Modal>
		</div>
	);
}
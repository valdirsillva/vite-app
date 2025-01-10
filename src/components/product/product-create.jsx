import { useContext, useState } from 'react'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { CustomInput, TextFieldCustom } from '../../utils/styles/custom-input'
import { TextField } from '@mui/material'
import { Add } from '@mui/icons-material'
import { toast, ToastContainer } from 'react-toastify'
import { ManagerStorage } from '../../service/manager-storage'
import { StoreContext } from '../../context/product-store'
import { RequiredFieldValidation } from '../../utils/validation/required-field-validation'

export const ProductCreate = () => {
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

			 /**
             * Valida campos obrigatórios
             */
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

	return (
		<div >
			<ToastContainer />
			<button type="button" onClick={handleOpen}
				className="hover:bg-[#41ec63] text-white font-semibold hover:text-white md:py-2 md:px-4 border border-[#41ec63] hover:border-transparent rounded"
			>
				<Add titleAccess="Adicionar produto" />
			</button>

			<section className="">
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
						Cadastrar produto
					</Typography>

					<div className="w-full flex flex-col mt-10 gap-4">
						<div className="">
							<TextField
								id="nomeProduto"
								name="nomeProduto"
								label="Produto"
								type="text"
								value={fieldValues.nomeProduto}
								autoComplete="current-password"
								sx={TextFieldCustom}
								className={`${CustomInput}`}
								placeholder="Nome do produto"
								onChange={handleChangeValues}
							/>
						</div>

						<div className="sm:w-full md:w-12/12">
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

						<div className="sm:w-full md:w-12/12">
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

						<div className="sm:w-full md:w-12/12 flex gap-5">
							<button
								type="button"
								onClick={handleClose}
								className={`flex justify-center border-2 border-[#ef0b0b] rounded-md transparent px-8 py-3 text-sm font-semibold leading-6 text-white shadow-sm`}
							>
								Cancelar
							</button>

							<button
								type="button"
								onClick={onSave}
								// disabled={!isLoginFormValid}
								className={`flex justify-center rounded-md bg-[#04b200] px-8 py-3 border-2 border-[#04b200] text-sm font-semibold leading-6 text-white shadow-sm`}
							>
								Salvar
							</button>
						</div>
					</div>
				</Box>
			</Modal>
			</section>
		</div>
	);
}
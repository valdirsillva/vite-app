
import { useContext, useState } from 'react'
import { toast } from 'react-toastify'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'

import { Delete } from '@mui/icons-material'
import { ManagerStorage } from '../../service/manager-storage'
import { StoreContext } from '../../context/product-store'

export const ProductDelete = ({ productId }) => {
	const storage = new ManagerStorage();
	const { setCounter } = useContext(StoreContext)

	const [open, setOpen] = useState(false)
	const [fieldValues, setFieldValues] = useState({
		nomeProduto: '',
		descricaoProduto: '',
		preco: '',
	})

	const onDelete = async () => {
		try {
			const response = storage.delete('produtos', productId);
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
		return content.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
	}

	const handleOpen = () => {
		setOpen(true)
		getProductById()
	}
	const handleClose = () => setOpen(false)

	return (
		<div >
			<Delete
				fontSize='medium'
				titleAccess='Deletar produto'
				onClick={handleOpen}
				className='cursor-pointer text-red-600'
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
						Deletar produto
					</Typography>

					<div className="flex flex-col mt-10 gap-4">
						<div className="w-12/12 flex gap-3 flex-col">
							<span>Produto: {fieldValues.nomeProduto} </span>
							<span>Descrição: {fieldValues.descricaoProduto} </span>
							<span>Preço: {formatPriceProduct(fieldValues.preco)} </span>
						</div>

						<div className="w-12/12 flex gap-5 mt-5">
							<button
								type="button"
								onClick={handleClose}
								className={`flex justify-center border-2 border-[#04b200] rounded-md transparent  px-8 py-3 text-sm font-semibold leading-6 text-white shadow-sm`}
							>
								Não
							</button>

							<button
								type="button"
								onClick={onDelete}
								// disabled={!isLoginFormValid}
								className={`flex justify-center rounded-md bg-[#ef0b0b] px-8 py-3 border-2 border-[#ef0b0b] text-sm font-semibold leading-6 text-white shadow-sm`}
							>
								Sim
							</button>
						</div>
					</div>
				</Box>
			</Modal>
		</div>
	)
}
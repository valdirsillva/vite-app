import { Edit } from '@mui/icons-material'
import { Box, TextField, Modal, Typography } from '@mui/material'
import { CustomInput, TextFieldCustom } from '../../utils/styles/custom-input'
import { useEditProduct } from '../../hooks/use-edit-product'

export const ProductEdit = ({ productId }) => {
	const { fieldValues, handleChangeValues, handleClose, handleOpen,open, onEdit } = useEditProduct(productId);

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
								className={`flex justify-center border-2 border-[#ef0b0b] rounded-md transparent px-8 py-3 text-sm font-semibold leading-6 text-white shadow-sm`}
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
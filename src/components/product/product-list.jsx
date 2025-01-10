import * as React from 'react'
import { toast } from 'react-toastify'
import { DataGrid } from '@mui/x-data-grid'
import { ManagerStorage } from '../../service/manager-storage'
import { StoreContext } from '../../context/product-store'
import { ProductEdit } from './product-edit'
import { ProductDelete } from './product-delete'

import { customStyles } from './styles'

const columns = [
	{ field: 'id', headerName: 'ID', width: 70 },
	{ field: 'nomeProduto', headerName: 'NOME PRODUTO', width: 180 },
	{ field: 'descricaoProduto', headerName: 'DESCRIÇÃO', width: 400 },
	{ field: 'preco', headerName: 'PREÇO', width: 200 },

	{
		field: 'edit',
		headerName: '-',
		width: 200,
		renderCell: (params) => {
			const productId = params.row.id;
			return (
				<div style={{ display: 'flex', gap: 20, justifyContent: 'center', width: '100%' }}>
					<ProductEdit productId={productId} />

					<ProductDelete productId={productId} />
				</div>
			)
		},
	}
]

const paginationModel = { page: 0, pageSize: 5 }

export function DataTable() {
	const storage = new ManagerStorage();
	const [rows, setRows] = React.useState([])
	const { counter } = React.useContext(StoreContext);

	React.useEffect(() => {
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

	function formatProductPrice(price){
		return price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
	}

	return (
		<div className="sm:w-10/12 w-9/12 " >
			<DataGrid
				rows={sortedRowsByLastedId}
				columns={columns}
				initialState={{ pagination: { paginationModel } }}
				pageSizeOptions={[5, 10]}
				sx={{ border: 0, ...customStyles}}
			/>
		</div>
	)
}
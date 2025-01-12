import * as React from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { ProductEdit } from './product-edit'
import { ProductDelete } from './product-delete'
import { useListProduct } from '../../hooks/use-list-product'
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
	const { sortedRowsByLastedId } = useListProduct()

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
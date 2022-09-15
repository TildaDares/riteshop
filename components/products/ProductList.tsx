import React, { useState } from 'react';
import { Grid, Paper, TableBody, TableContainer, TableHead, TablePagination, Table, Link, IconButton, Backdrop, CircularProgress } from '@mui/material';
import dayjs from 'dayjs'
import { Column } from '@/types/ProductList'
import { StyledTableRow, StyledTableCell } from "@/components/TableStyledComponent"
import { Typography } from '@mui/material';
import NextLink from 'next/link'
import { Product } from '@/types/Product';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack';
import { getError } from '@/utils/error';
import { deleteData } from '@/utils/fetchData';
import { mutate } from 'swr';

const columns: readonly Column[] = [
  { id: '_id', label: 'ID', minWidth: 170 },
  { id: 'price', label: 'Price', minWidth: 100 },
  { id: 'quantity', label: 'Quantity', minWidth: 100 },
  {
    id: 'createdAt',
    label: 'Date of Creation',
    minWidth: 120,
    align: 'right',
  },
  {
    id: 'actions',
    label: 'Actions',
    minWidth: 120,
    align: 'right',
  }
];

const OrderList = ({ products }: { products: Product[] }) => {
  const [page, setPage] = useState(0);
  const router = useRouter()
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false)

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  function handleEdit(id: string) {
    router.push(`/product/edit/${id}`)
  }


  async function handleDelete(id: string) {
    closeSnackbar()
    setLoading(true)
    try {
      await deleteData(`products/${id}`)
      enqueueSnackbar('Product successfully deleted', { variant: 'success' });
      mutate('products')
      setLoading(false)
    } catch (error) {
      setLoading(false)
      enqueueSnackbar(getError(error), { variant: 'error' });
    }
  }

  if (loading) {
    return (
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    )
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', mt: 3 }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader>
          <TableHead>
            <StyledTableRow>
              {columns.map((column) => (
                <StyledTableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </StyledTableCell>
              ))}
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {products
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((product: Product) => {
                return (
                  <StyledTableRow hover role="checkbox" tabIndex={-1} key={product._id}>
                    <StyledTableCell sx={{
                      minWidth: 120,
                      align: 'right'
                    }}>
                      <NextLink href={`/product/${product._id}`} passHref>
                        <Link>
                          <Typography>{product._id}</Typography>
                        </Link>
                      </NextLink>
                    </StyledTableCell>
                    <StyledTableCell>
                      <Typography color="secondary">${product.price}</Typography>
                    </StyledTableCell>
                    <StyledTableCell>
                      <Typography color="secondary">{product.quantity}</Typography>
                    </StyledTableCell>
                    <StyledTableCell align='right' style={{ minWidth: '120px' }}>
                      <Typography>{dayjs(product.createdAt).format('MMMM DD, YYYY')}</Typography>
                    </StyledTableCell>
                    <StyledTableCell align='right' style={{ minWidth: '120px' }}>
                      <Grid>
                        <IconButton aria-label="Edit product" color='primary' onClick={() => handleEdit(product._id as string)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton aria-label="Delete product" color='secondary' onClick={() => handleDelete(product._id as string)}>
                          <DeleteIcon />
                        </IconButton>
                      </Grid>
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={products.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default OrderList

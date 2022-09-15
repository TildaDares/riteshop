import React, { useState } from 'react';
import { Paper, TableBody, TableContainer, TableHead, TablePagination, Table, Link } from '@mui/material';
import dayjs from 'dayjs'
import { Column } from '@/types/OrderList'
import { Order } from '@/types/Order';
import { StyledTableRow, StyledTableCell } from "@/components/TableStyledComponent"
import { Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import NextLink from 'next/link'

const columns: readonly Column[] = [
  { id: '_id', label: 'ID', minWidth: 170 },
  { id: 'total', label: 'Total ($)', minWidth: 100 },
  {
    id: 'isPaid',
    label: 'Paid',
    minWidth: 20,
    align: 'right',
  },
  {
    id: 'isDelivered',
    label: 'Delivered',
    minWidth: 20,
    align: 'right',
  },
  {
    id: 'createdAt',
    label: 'Date of Order',
    minWidth: 120,
    align: 'right',
  }
];

const OrderList = ({ orders }: { orders: Order[] }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

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
            {orders
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((order: Order) => {
                return (
                  <StyledTableRow hover role="checkbox" tabIndex={-1} key={order._id}>
                    <StyledTableCell sx={{
                      minWidth: 120,
                      align: 'right'
                    }}>
                      <NextLink href={`/orders/${order._id}`} passHref>
                        <Link>
                          <Typography>{order._id}</Typography>
                        </Link>
                      </NextLink>
                    </StyledTableCell>
                    <StyledTableCell>
                      <Typography color="secondary">{order.total}</Typography>
                    </StyledTableCell>
                    <StyledTableCell align='right' style={{ minWidth: '20px' }}>
                      <Typography>{order.isPaid ? <CheckIcon sx={{ color: 'green' }} /> : <CloseIcon color='secondary' />}</Typography>
                    </StyledTableCell>
                    <StyledTableCell align='right' style={{ minWidth: 20 }}>
                      <Typography>{order.isDelivered ? <CheckIcon sx={{ color: 'green' }} /> : <CloseIcon color='secondary' />}</Typography>
                    </StyledTableCell>
                    <StyledTableCell align='right' style={{ minWidth: '120px' }}>
                      <Typography>{dayjs(order.createdAt).format('MMMM DD, YYYY')}</Typography>
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
        count={orders.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default OrderList

import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import dayjs from 'dayjs'
import { Column } from '@/types/UserList'
import { StyledTableRow, StyledTableCell } from "@/components/TableStyledComponent"
import { User } from "@/types/User"
import { Link, Typography } from '@mui/material';
import NextLink from 'next/link'

const columns: readonly Column[] = [
  { id: '_id', label: 'ID', minWidth: 170 },
  { id: 'role', label: 'Role', minWidth: 100 },
  {
    id: 'orders',
    label: 'Orders',
    minWidth: 120,
    align: 'right',
  },
  {
    id: 'createdAt',
    label: 'Joined',
    minWidth: 120,
    align: 'right',
    format: (value: string) => dayjs(value).format('MMMM DD, YYYY'),
  }
];

const UserList = ({ users }: { users: User[] }) => {
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
            {users
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((user: User) => {
                return (
                  <StyledTableRow hover role="checkbox" tabIndex={-1} key={user._id}>
                    <StyledTableCell sx={{
                      minWidth: 120,
                      align: 'right'
                    }}>
                      <NextLink href={`/users/${user._id}`} passHref>
                        <Link>
                          <Typography>{user.name}</Typography>
                        </Link>
                      </NextLink>
                    </StyledTableCell>
                    <StyledTableCell>
                      <Typography>{user.role}</Typography>
                    </StyledTableCell>
                    <StyledTableCell align='right'>
                      <NextLink href={`/orders/user/${user._id}`} passHref>
                        <Link>
                          <Typography>View all orders</Typography>
                        </Link>
                      </NextLink>
                    </StyledTableCell>
                    <StyledTableCell align='right' style={{ minWidth: '120px' }}>
                      <Typography>{dayjs(user.createdAt).format('MMMM DD, YYYY')}</Typography>
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
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default UserList
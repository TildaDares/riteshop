import React, { useState } from 'react';
import { Link, Paper } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import dayjs from 'dayjs'
import { StatusColors } from '@/types/RequestList'
import { Column } from '@/types/AdminRequestList'
import { StyledTableRow, StyledTableCell } from "@/components/TableStyledComponent"
import { Request } from "@/types/Request"
import { Grid, Button, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import { getError } from '@/utils/error'
import NextLink from 'next/link'
import axiosInstance from '@/utils/axiosConfig'
import { User } from '@/types/User';
import { mutate } from 'swr';

const statusColors: StatusColors = {
  rejected: '#cc2727',
  approved: '#3b953e',
  pending: '#fd9400',
}

const columns: readonly Column[] = [
  { id: 'user', label: 'User', minWidth: 170 },
  { id: 'currentRole', label: 'Current Role', minWidth: 170 },
  { id: 'requestedRole', label: 'Requested Role', minWidth: 100 },
  {
    id: 'status',
    label: 'Status',
    minWidth: 120,
    align: 'right',
  },
  {
    id: 'createdAt',
    label: 'Date of Request',
    minWidth: 120,
    align: 'right',
  }
];

const AdminRequestList = ({ requests }: { requests: Request[] }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleAction = async (id: string, status: string) => {
    closeSnackbar();
    try {
      await axiosInstance.put(`request-role/${id}`, { status })
      enqueueSnackbar(`Role ${status} successfully`, { variant: 'success' });
      mutate('request-role')
    } catch (error) {
      enqueueSnackbar(getError(error), { variant: 'error' });
    }
  }

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
              <>
                {columns.map((column) => (
                  <StyledTableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </StyledTableCell>
                ))}
                <StyledTableCell
                  key={'actions'}
                  align='right'
                >
                  Actions
                </StyledTableCell>
              </>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {requests
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((req: Request) => {
                const user = req.requester as User
                return (
                  <StyledTableRow hover role="checkbox" tabIndex={-1} key={req._id}>
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
                    <StyledTableCell>
                      <Typography>{req.requestedRole}</Typography>
                    </StyledTableCell>
                    <StyledTableCell align="right" sx={{ color: statusColors[req.status as keyof StatusColors] ?? '' }}>
                      {req.status.toUpperCase()}
                    </StyledTableCell>
                    <StyledTableCell align='right' style={{ minWidth: '120px' }}>
                      <Typography>{dayjs(req.createdAt).format('MMMM DD, YYYY')}</Typography>
                    </StyledTableCell>
                    <StyledTableCell align='right' style={{ minWidth: '120px' }}>
                      <Grid>
                        <Button aria-label="Approve role" variant="outlined" color='primary' disabled={req.status != 'pending'} onClick={() => handleAction(req._id as string, 'approved')}>
                          Approve
                        </Button>
                        <Button aria-label="Reject role" variant="outlined" color='secondary' disabled={req.status != 'pending'} onClick={() => handleAction(req._id as string, 'rejected')}>
                          Reject
                        </Button>
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
        count={requests.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default AdminRequestList

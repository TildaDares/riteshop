import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import dayjs from 'dayjs'
import { StatusColors, Column } from '@/types/RequestList'
import { StyledTableRow, StyledTableCell } from "@/components/TableStyledComponent"
import { Request } from "@/types/Request"

const statusColors: StatusColors = {
  rejected: '#cc2727',
  approved: '#3b953e',
  pending: '#fd9400',
}

const columns: readonly Column[] = [
  { id: '_id', label: 'ID', minWidth: 170 },
  { id: 'requestedRole', label: 'Requested Role', minWidth: 100 },
  {
    id: 'status',
    label: 'Status',
    minWidth: 120,
    align: 'right',
    format: (value: string) => value.toUpperCase()
  },
  {
    id: 'createdAt',
    label: 'Date of Request',
    minWidth: 120,
    align: 'right',
    format: (value: string) => dayjs(value).format('MMMM DD, YYYY'),
  }
];

const RequestList = ({ requests }: { requests: Request[] }) => {
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
            {requests
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((req: Request) => {
                return (
                  <StyledTableRow hover role="checkbox" tabIndex={-1} key={req._id}>
                    {columns.map((column) => {
                      const value = req[column.id] as string;
                      return (
                        <StyledTableCell key={column.id} align={column.align} sx={{ color: statusColors[value as keyof StatusColors] ?? '' }}>
                          {column.format
                            ? column.format(value).toString()
                            : value}
                        </StyledTableCell>
                      );
                    })}
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

export default RequestList
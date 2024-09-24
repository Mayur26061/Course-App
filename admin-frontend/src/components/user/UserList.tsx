import React, {FC, useEffect, useState} from 'react'
import { fetchUsers } from './fetch';
import User from './User';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
export interface userType {
  id: string;
  name: string;
  username: string;
  password: string;
  image: string | null;
  createAt: string;
  userType: string;
  isApproved: boolean;
}
const UserList:FC = () => {
  const [users, setUsers] = useState<userType[]>([]);
  useEffect(() => {
    async function fetchApi() {
      const result = await fetchUsers();
      setUsers(result);
    }
    fetchApi();
  });
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="center">User Type</TableCell>
            <TableCell align="center">Usename</TableCell>
            <TableCell align="center">Password</TableCell>
            <TableCell align="center">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
<TableCell component="th" scope="row">
              {/* <TableCell align="center"> */}
                {row.name}</TableCell>
              <TableCell align="center">{row.userType}</TableCell>
              <TableCell align="center">{row.username}</TableCell>
              <TableCell align="center">{row.password}</TableCell>
              <TableCell align="center">{row.isApproved?'Active':'inActive'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default UserList



export function BasicTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Usename</TableCell>
            <TableCell align="right">Password</TableCell>
            <TableCell align="right">User Type</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.username}</TableCell>
              <TableCell align="right">{row.password}</TableCell>
              <TableCell align="right">{row.userType}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
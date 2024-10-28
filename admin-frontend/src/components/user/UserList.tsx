import React, { FC, useEffect, useState } from "react";
import { fetchUsers } from "./fetch";
import User from "./User";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
export interface checktype {
  username: string;
  password: string;
  userType: string;
  name: string;
};
export interface userType  extends checktype{
  id: string;
  image: string | null;
  createAt: string;
  isApproved: boolean;
}
const UserList: FC = () => {
  const [users, setUsers] = useState<userType[]>([]);
  useEffect(() => {
    async function fetchApi() {
      const result = await fetchUsers();
      setUsers(result);
    }
    fetchApi();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="center">User Type</TableCell>
            <TableCell align="center">Usename</TableCell>
            <TableCell align="center">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((row) => (
            <User key={row.id} user={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserList;

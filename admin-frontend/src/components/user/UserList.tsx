import React, { FC, useEffect } from "react";
import { fetchUsers } from "./fetch";
import User from "./User";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { usersDataState } from "../../store/atoms/user";
import { useRecoilState } from "recoil";

const UserList: FC = () => {
  const [users, setUsers] = useRecoilState(usersDataState);

  useEffect(() => {
    async function fetchApi() {
      setUsers({ isLoading: true, user: [] });
      const result = await fetchUsers();
      setUsers({ isLoading: false, user: result });
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
          {users.user.map((row) => (
            <User key={row.id} user={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserList;

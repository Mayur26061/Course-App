import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { FC, useEffect } from "react";
import { useRecoilState } from "recoil";
import { usersDataState } from "../../store/atoms/user";
import { fetchUsers } from "./fetch";
import User from "./User";

const UserList: FC = () => {
  const [users, setUsers] = useRecoilState(usersDataState);

  useEffect(() => {
    const fetchApi = async () => {
      setUsers({ isLoading: true, users: [] });
      const result = await fetchUsers();
      setUsers({ isLoading: false, users: result });
    };
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
          {users.users.map((row) => (
            <User key={row.id} user={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserList;

import { TableCell, TableRow } from '@mui/material'
import React, {FC, useState} from 'react'
import { userType } from "../../store/atoms/user";
import UserModal from './UserModal'
type usrr = {
  user: userType
}
const User:FC<usrr> = ({user}) => {
  const [open, setOpen] = useState(false);
  // const {cid} = useParams()

  const handleOpen = (ev: { stopPropagation: () => void; }) => {
    ev.stopPropagation();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <TableRow
    onClick={handleOpen}
    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
  >
    <TableCell component="th" scope="user">
      {user.name}
    </TableCell>
    <TableCell align="center">{user.userType}</TableCell>
    <TableCell align="center">{user.username}</TableCell>
    <TableCell align="center">
      {user.isApproved ? "Active" : "inActive"}
    </TableCell>
    { open &&
      <UserModal handleClose={handleClose} open={open} user={user}/>
    }
  </TableRow>
  )
}

export default User

import { TableCell, TableRow } from '@mui/material'
import React, {FC} from 'react'
import { userType } from './UserList'
type usrr = {
  user: userType
}
const User:FC<usrr> = ({user}) => {
  return (
    <TableRow
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
  </TableRow>
  )
}

export default User

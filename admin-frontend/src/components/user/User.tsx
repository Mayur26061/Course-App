import { Typography } from '@mui/material'
import React, {FC} from 'react'
import { userType } from './UserList'
type usrr = {
  user: userType
}
const User:FC<usrr> = ({user}) => {
  return (
    <div className='p-1'>
      <Typography>{user.name}</Typography>
    </div>
  )
}

export default User

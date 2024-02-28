import { Button,Typography } from '@mui/material'
import React from 'react'

const Appbar = () => {
  return (
    <div style={{display:"flex",justifyContent:"space-between",padding:10}}>
        <div>
        <Typography variant='h6'>
            Coursera
        </Typography>
        </div>
    <div>
      <Button size='small' variant='contained'>Sign Up</Button>
      <Button size='small'>Sign In</Button>
        </div>
    </div>
  )
}

export default Appbar

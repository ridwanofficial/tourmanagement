import React from 'react'
import { Typography } from '@mui/material'

const Title = ({ children }) => {
  return (
    <Typography
      variant='h6'
      component='h6'
      style={{ fontWeight: 'bold', marginBottom: '1rem', letterSpacing: '.75' }}
    >
      {children}
    </Typography>
  )
}

export default Title

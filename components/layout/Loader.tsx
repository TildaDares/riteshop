import React from 'react'
import { Typography, Container } from '@mui/material'


const Loader = () => {
  return (
    <Container sx={{
      alignContent: 'center',
      alignItems: 'center',
      display: 'flex',
      height: '100%',
      justifyContent: 'center',
      opacity: 1,
      position: 'fixed',
      top: 0,
      transition: 'opacity .3s linear',
      width: '100%',
      zIndex: 9999
    }}>
      <Typography
        sx={{
          fontSize: '1.5rem',
          fontFamily: 'monospace',
          fontWeight: 700,
          letterSpacing: '.3rem',
        }}
      >
        Riteshop
      </Typography>
    </Container>
  )
}

export default Loader
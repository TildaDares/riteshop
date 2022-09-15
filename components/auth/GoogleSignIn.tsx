import React from 'react'
import { Button, Typography } from '@mui/material'
import Image from 'next/image'

const GoogleSignIn = ({ buttonTitle }: { buttonTitle: string }) => {

  const login = () => {
    window.open(`${process.env.NEXT_PUBLIC_DB_HOST}/api/auth/google`, "_self");
  };

  return (
    <Button
      variant="outlined"
      type="submit"
      fullWidth
      onClick={login}
      sx={{
        p: 1,
        backgroundColor: '#fff',
        color: '#0d0c22'
      }}
    >
      <Image src='/google.svg' width="30px" height="30px" alt="Google Logo" />
      <Typography sx={{ ml: 1 }}>{`${buttonTitle}`} with Google</Typography>
    </Button>
  )
}

export default GoogleSignIn

import { useState } from 'react'
import { Box, Button, TextField } from '@mui/material';
import { Link } from 'react-router-dom'
import  LoadingButton  from '@mui/lab/LoadingButton';

export const Login = () => {
  const [loader, setLoader] = useState(false)

  const handleSubmit = (e) => { 

  }
  return (
    <>
      <Box
      component='form'
      sx={{ mt: 1}}
      onSubmit={handleSubmit}
      noValidate
      >
        <TextField
          margin='normal'
          required
          fullWidth
          id='username'
          label='Username'
          name='username'
          disabled={loader}
        />
        <TextField
          margin='normal'
          required
          fullWidth
          id='password'
          label='Password'
          name='password'
          type='password'
          disabled={loader}
        />
        <LoadingButton
          sx={{ mt: 3, mb: 2 }}
          variant='outlined'
          fullWidth
          color='success'
          type='submit'
          loading={loader}
          >
          Login
        </LoadingButton>
      </Box>
      <Button
        variant='outlined'
        component={Link}
        to='/signup'
        sx={{ textTransform: 'none' }}
      >
        Sign up
      </Button>
    </>
  )
}

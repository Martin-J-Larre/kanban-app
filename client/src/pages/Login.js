import { useState } from 'react'
import { Box, Button, TextField } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom'
import  LoadingButton  from '@mui/lab/LoadingButton';
import authApi from '../services/authApi';

export const Login = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [userNameErrorText, setUserNameErrorText] = useState('');
  const [passwordErrorText, setPasswordErrorText] = useState('');

  const handleSubmit = async (e) => { 
    e.preventDefault();
    setUserNameErrorText('');
    setPasswordErrorText('');

    const data = new FormData(e.target);
    const username = data.get('username').trim();
    const password = data.get('password').trim();

    let err = false;

    if (username === '') {
      err = true;
      setUserNameErrorText('You should write a Username');
    }
    if (password === '') {
      err = true;
      setPasswordErrorText('You should write a Password');
    }

    if (err) return

    setLoader(true);

    try {
      const res = await authApi.login({ username, password });
      setLoader(false);
      localStorage.setItem('token', res.token);
      navigate('/');
    } catch (err) {
      const errors = err.data.errors
      errors.forEach(e => {
        if (e.param === 'username') {
          setUserNameErrorText(e.msg)
        }
        if (e.param === 'password') {
          setPasswordErrorText(e.msg)
        }
      })
      setLoader(false)
    }
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
          error={userNameErrorText !== ''}
          helperText={userNameErrorText}
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
          error={passwordErrorText !== ''}
          helperText={passwordErrorText}
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

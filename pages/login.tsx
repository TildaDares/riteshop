import React from 'react'
import Router from 'next/router';
import Layout from '@/components/Layout'
import { Controller, useForm } from 'react-hook-form';
import NextLink from 'next/link'
import { useSnackbar } from 'notistack';
import { getError } from '@/utils/error';
import { Container, TextField, Link, List, ListItem, Button, Typography } from '@mui/material'
import useLogin from '@/hooks/auth/useLogin'
import { useSWRConfig } from 'swr'
import { FormValues } from '@/types/Login'

const Login = () => {
  const { mutate } = useSWRConfig()
  const login = useLogin();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const submitHandler = async ({ email, password }: { email: string, password: string }) => {
    closeSnackbar();
    try {
      await login(email, password)
      mutate('users')
      Router.back()
    } catch (err) {
      enqueueSnackbar(getError(err), { variant: 'error' });
    }
  };

  return (
    <Layout title='Login'>
      <Container maxWidth="sm" sx={{ minHeight: '80vh' }}>
        <form onSubmit={handleSubmit(submitHandler)}>
          <Typography component="h1" variant="h1" sx={{ textAlign: 'center' }}>
            Login
          </Typography>
          <List>
            <ListItem>
              <Controller
                name="email"
                control={control}
                rules={{
                  required: true,
                  pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                }}
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="email"
                    label="Email"
                    inputProps={{ type: 'email' }}
                    error={Boolean(errors.email)}
                    helperText={
                      errors.email
                        ? errors.email.type === 'pattern'
                          ? 'Email is not valid'
                          : 'Email is required'
                        : ''
                    }
                    {...field}
                  ></TextField>
                )}
              ></Controller>
            </ListItem>
            <ListItem>
              <Controller
                name="password"
                control={control}
                defaultValue=""
                rules={{
                  required: true,
                  minLength: 8,
                }}
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="password"
                    label="Password"
                    inputProps={{ type: 'password' }}
                    error={Boolean(errors.password)}
                    helperText={
                      errors.password
                        ? errors.password.type === 'minLength'
                          ? 'Password length is more than 5'
                          : 'Password is required'
                        : ''
                    }
                    {...field}
                  ></TextField>
                )}
              ></Controller>
            </ListItem>
            <ListItem>
              <Button variant="contained" type="submit" fullWidth color="primary">
                Login
              </Button>
            </ListItem>
            <ListItem>
              Don&apos;t have an account? &nbsp;
              <NextLink href='/' passHref>
                <Link>Register</Link>
              </NextLink>
            </ListItem>
          </List>
        </form>
      </Container>
    </Layout>
  )
}

export default Login

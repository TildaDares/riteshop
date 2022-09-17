import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Controller, useForm } from 'react-hook-form';
import NextLink from 'next/link'
import { useSnackbar } from 'notistack';
import { getError } from '@/utils/error';
import { Container, TextField, Grid, Link, List, ListItem, Button, Typography } from '@mui/material'
import useLogin from '@/hooks/auth/useLogin'
import { FormValues } from '@/types/Login'
import useUser from '@/hooks/user/useUser'
import GoogleSignIn from '@/components/auth/GoogleSignIn';
import Meta from '@/components/layout/Meta';
import { mutate } from 'swr';

const Login = () => {
  const { user } = useUser()
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

  const router = useRouter();
  const redirect = router.query['redirect'] as string;
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const submitHandler = async ({ email, password }: FormValues) => {
    closeSnackbar();
    try {
      await login(email, password)
      mutate('users')
      router.push(redirect ? redirect : '/')
    } catch (err) {
      enqueueSnackbar(getError(err), { variant: 'error' });
    }
  };

  useEffect(() => {
    if (user) {
      router.push('/') // redirect to homepage if logged in
    }
  }, [router, user])

  return (
    <Container maxWidth="sm" sx={{ minHeight: '80vh' }}>
      <Meta title="Login" />
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
                        ? 'Password length is less than 8'
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
              <Typography>Login</Typography>
            </Button>
          </ListItem>
          <ListItem>
            Don&apos;t have an account? &nbsp;
            <NextLink href={`/register?redirect=${redirect || '/'}`} passHref>
              <Link>Register</Link>
            </NextLink>
          </ListItem>
        </List>
      </form>
      <Grid sx={{ display: 'flex', alignItems: 'center', mt: 2, mb: 2 }}>
        <hr style={{ width: '100%', height: '2px' }} />
        <Typography sx={{ ml: '10px', mr: '10px' }}>OR</Typography>
        <hr style={{ width: '100%', height: '2px' }} />
      </Grid>
      <GoogleSignIn buttonTitle='Login' />
    </Container>
  )
}

export default Login

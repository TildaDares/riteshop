import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import Meta from '@/components/Meta'
import { Controller, useForm } from 'react-hook-form';
import NextLink from 'next/link'
import { useSnackbar } from 'notistack';
import { getError } from '@/utils/error';
import { Container, TextField, Grid, Link, List, ListItem, Button, Typography } from '@mui/material'
import useRegister from '@/hooks/auth/useRegister'
import useUser from '@/hooks/user/useUser'
import { FormValues } from '@/types/Register'
import GoogleSignIn from '@/components/GoogleSignIn';

const Register = () => {
  const { user } = useUser()
  const register = useRegister();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  });
  const router = useRouter();
  const { redirect } = router.query;
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const submitHandler = async ({ name, email, password }: FormValues) => {
    closeSnackbar();
    try {
      await register(name, email, password)
      window.location.href = (redirect ? redirect : '/') as string
    } catch (err) {
      enqueueSnackbar(getError(err), { variant: 'error' });
    }
  };

  useEffect(() => {
    if (user) {
      router.push('/') //redirect to homepage if logged in
    }
  }, [router, user])

  return (
    <Container maxWidth="sm" sx={{ minHeight: '80vh' }}>
      <Meta title="Register" />
      <form onSubmit={handleSubmit(submitHandler)}>
        <Typography component="h1" variant="h1" sx={{ textAlign: 'center' }}>
          Register
        </Typography>
        <List>
          <ListItem>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 2,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="name"
                  label="Name"
                  inputProps={{ type: 'name' }}
                  error={Boolean(errors.name)}
                  helperText={
                    errors.name
                      ? errors.name.type === 'minLength'
                        ? 'Name length is less than 1'
                        : 'Name is required'
                      : ''
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Controller
              name="email"
              control={control}
              defaultValue=""
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
              <Typography>Register</Typography>
            </Button>
          </ListItem>
          <ListItem>
            Already have an account? &nbsp;
            <NextLink href={`/login?redirect=${redirect || '/'}`} passHref>
              <Link>Login</Link>
            </NextLink>
          </ListItem>
        </List>
      </form>
      <Grid sx={{ display: 'flex', alignItems: 'center', mt: 2, mb: 2 }}>
        <hr style={{ width: '100%', height: '2px' }} />
        <Typography sx={{ ml: '10px', mr: '10px' }}>OR</Typography>
        <hr style={{ width: '100%', height: '2px' }} />
      </Grid>
      <GoogleSignIn buttonTitle='Register' />
    </Container>
  )
}

export default Register
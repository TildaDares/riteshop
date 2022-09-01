import React from 'react'
import Layout from '@/components/Layout'
import { Controller, useForm } from 'react-hook-form';
import NextLink from 'next/link'
import { useSnackbar } from 'notistack';
import { getError } from '@/utils/error';
import { Container, TextField, Grid, Link, List, ListItem, Button, Typography } from '@mui/material'
import { FormValues } from '@/types/UpdateProfile'
import useUser from '@/hooks/user/useUser'
import { putData } from '@/utils/fetchData'
import Loader from '@/components/Loader';
import Protected from '@/components/Protected';

const UserProfile = () => {
  const { user, loading } = useUser()
  const initialState = {
    name: user ? user.name : '',
    email: user ? user.email : '',
  }
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: initialState
  });

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const submitHandler = async ({ email, name }: { email: string, name: string }) => {
    closeSnackbar();
    try {
      await putData(`users/${user._id}`, { email, name })
      enqueueSnackbar('Profile updated successfully', { variant: 'success' });
    } catch (err) {
      enqueueSnackbar(getError(err), { variant: 'error' });
    }
  };

  if (loading) {
    return <Loader />
  }

  return (
    <Layout title='Profile'>
      <Container maxWidth="sm" sx={{ minHeight: '80vh' }}>
        <form onSubmit={handleSubmit(submitHandler)}>
          <Typography component="h1" variant="h1" sx={{ textAlign: 'center' }}>
            Your Profile
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
              <Grid sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <Button variant="contained" type="submit" color="primary">
                  Save
                </Button>
                <Button variant="outlined" type="submit" color="primary">
                  <NextLink href='/' passHref>
                    <Link underline='none'>Cancel</Link>
                  </NextLink>
                </Button>
              </Grid>
            </ListItem>
          </List>
        </form>
      </Container>
    </Layout>
  )
}

export default Protected(UserProfile)
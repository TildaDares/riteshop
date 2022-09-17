import React from 'react'
import Meta from '@/components/layout/Meta'
import { Controller, useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import { getError } from '@/utils/error';
import { Container, TextField, Grid, List, ListItem, Button, Typography } from '@mui/material'
import { FormValues } from '@/types/UpdateProfile'
import Loader from '@/components/layout/Loader';
import ChangePassword from '@/components/auth/ChangePassword';
import { User } from '@/types/User';
import axiosInstance from '@/utils/axiosConfig'

const UserProfile = ({ title, user, loading }: { title: string, user: User, loading: any }) => {
  const initialState = {
    name: user ? user.name : ''
  }
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: initialState
  });

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const submitHandler = async ({ name }: FormValues) => {
    closeSnackbar();
    try {
      await axiosInstance.put(`users/${user._id}`, { name })
      enqueueSnackbar('Profile updated successfully', { variant: 'success' });
    } catch (err) {
      enqueueSnackbar(getError(err), { variant: 'error' });
    }
  };

  if (loading) {
    return <Loader />
  }

  return (
    <Container maxWidth="sm" sx={{ minHeight: '80vh' }}>
      <Meta title={title} />
      <form onSubmit={handleSubmit(submitHandler)}>
        <Typography component="h1" variant="h1" sx={{ textAlign: 'center' }}>
          {title}
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
            <Grid sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <Button variant="contained" type="submit" color="primary">
                Save
              </Button>
            </Grid>
          </ListItem>
        </List>
      </form>
      <ChangePassword userId={user._id as string} />
    </Container>
  )
}

export default UserProfile

import React from 'react'
import Meta from '@/components/Meta'
import { Controller, useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import { getError } from '@/utils/error';
import { Container, TextField, Grid, Link, List, ListItem, Button, Typography } from '@mui/material'
import { FormValues } from '@/types/UpdateProfile'
import useUser from '@/hooks/user/useUser'
import { putData } from '@/utils/fetchData'
import Loader from '@/components/Loader';
import Protected from '@/components/Protected';
import ChangePassword from '@/components/ChangePassword';

const UserProfile = () => {
  const { user, loading } = useUser()
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

  const submitHandler = async ({ email, name }: FormValues) => {
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
    <Container maxWidth="sm" sx={{ minHeight: '80vh' }}>
      <Meta title="Your Profile" />
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
            <Grid sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <Button variant="contained" type="submit" color="primary">
                Save
              </Button>
            </Grid>
          </ListItem>
        </List>
      </form>
      <ChangePassword userId={user._id} />
    </Container>
  )
}

export default Protected(UserProfile)
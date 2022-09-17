import React from 'react'
import { Controller, useForm } from 'react-hook-form';
import NextLink from 'next/link'
import { useSnackbar } from 'notistack';
import { getError } from '@/utils/error';
import { TextField, Grid, Link, List, ListItem, Button, Typography } from '@mui/material'
import { FormValues } from '@/types/UpdatePassword'
import axiosInstance from '@/utils/axiosConfig'

const ChangePassword = ({ userId }: { userId: string }) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: ''
    }
  });

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const submitHandler = async ({ oldPassword, newPassword, confirmNewPassword }: FormValues) => {
    closeSnackbar();
    try {
      if (newPassword !== confirmNewPassword) {
        enqueueSnackbar("New Password and Confirm New Password does not match", { variant: 'error' });
        return;
      }
      await axiosInstance.put(`users/change-password/${userId}`, { oldPassword, newPassword, confirmNewPassword })
      reset()
      enqueueSnackbar('Password changed successfully', { variant: 'success' });
    } catch (err) {
      enqueueSnackbar(getError(err), { variant: 'error' });
    }
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <Typography component="h2" variant="h2" sx={{ textAlign: 'left', pl: 2 }}>
        Change Password
      </Typography>
      <List>
        <ListItem>
          <Controller
            name="oldPassword"
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
                id="oldPassword"
                label="Old Password"
                inputProps={{ type: 'password' }}
                error={Boolean(errors.oldPassword)}
                helperText={
                  errors.oldPassword
                    ? errors.oldPassword.type === 'minLength'
                      ? 'Old Password length is less than 8'
                      : 'Old Password is required'
                    : ''
                }
                {...field}
              ></TextField>
            )}
          ></Controller>
        </ListItem>
        <ListItem>
          <Controller
            name="newPassword"
            control={control}
            defaultValue=""
            rules={{
              required: true,
              minLength: 2
            }}
            render={({ field }) => (
              <TextField
                variant="outlined"
                fullWidth
                id="newPassword"
                label="New Password"
                inputProps={{ type: 'password' }}
                error={Boolean(errors.newPassword)}
                helperText={
                  errors.newPassword
                    ? errors.newPassword.type === 'minLength'
                      ? 'New Password length is less than 8'
                      : 'New Password is required'
                    : ''
                }
                {...field}
              ></TextField>
            )}
          ></Controller>
        </ListItem>
        <ListItem>
          <Controller
            name="confirmNewPassword"
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
                id="confirmNewPassword"
                label="Confirm New Password"
                inputProps={{ type: 'password' }}
                error={Boolean(errors.confirmNewPassword)}
                helperText={
                  errors.confirmNewPassword
                    ? errors.confirmNewPassword.type === 'minLength'
                      ? 'Confirm New Password length is less than 8'
                      : 'Confirm New Password is required'
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
              Change Password
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
  )
}

export default ChangePassword

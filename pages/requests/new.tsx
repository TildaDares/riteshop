import React from 'react'
import Meta from '@/components/Meta'
import useCreateRequest from '@/hooks/request/useCreateRequest'
import { getError } from '@/utils/error';
import { useSnackbar } from 'notistack';
import Protected from '@/components/Protected'
import { Container, Typography, TextField, List, ListItem, Button } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { FormValues } from '@/types/RequestRole'
import { useRouter } from 'next/router';
import useUser from '@/hooks/user/useUser';

const NewRequest = () => {
  const { user } = useUser()
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const router = useRouter();
  const createRequest = useCreateRequest();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      requestedRole: '',
    }
  });

  const submitHandler = async ({ requestedRole }: FormValues) => {
    closeSnackbar()
    try {
      const role = requestedRole.split(' ').join('').toLowerCase()
      await createRequest(role)
      enqueueSnackbar('Role requested successfully', { variant: 'success' });
      router.push(`/requests/user/${user._id}`)
    } catch (err) {
      enqueueSnackbar(getError(err), { variant: 'error' });
    }
  }

  return (
    <Container maxWidth="sm" sx={{ minHeight: '80vh' }}>
      <Meta title="New Request" />
      <form onSubmit={handleSubmit(submitHandler)}>
        <Typography variant="h1" component="h1" sx={{ textAlign: 'center' }}>
          New Role Request
        </Typography>
        <List>
          <ListItem>
            <Controller
              name="requestedRole"
              control={control}
              rules={{
                required: true,
                validate: (value) => {
                  const role = value.split(' ').join('').toLowerCase()
                  return role === 'admin' || role === 'salesagent'
                }
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="requestedRole"
                  placeholder="Ex. salesagent or admin"
                  label="Requested Role"
                  inputProps={{ type: 'text' }}
                  error={Boolean(errors.requestedRole)}
                  helperText={
                    errors.requestedRole
                      ? errors.requestedRole.type === 'validate'
                        ? 'Role can either be salesagent or admin'
                        : 'Role is required'
                      : ''
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Button variant="contained" type="submit" fullWidth color="primary">
              <Typography>Submit</Typography>
            </Button>
          </ListItem>
        </List>
      </form>
    </Container>
  )
}

export default Protected(NewRequest)
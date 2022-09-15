import React, { useEffect, useState } from 'react'
import Meta from '@/components/layout/Meta'
import useCreateRequest from '@/hooks/request/useCreateRequest'
import { getError } from '@/utils/error';
import { useSnackbar } from 'notistack';
import Protected from '@/components/auth/Protected'
import { Container, Typography, Button, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useRouter } from 'next/router';
import useUser from '@/hooks/user/useUser';
import { ROLES } from '@/types/Roles'
import Loader from '@/components/layout/Loader'
import Select, { SelectChangeEvent } from '@mui/material/Select';

const roles: ROLES = {
  salesagent: 'Sales Agent',
  customer: 'Customer',
  admin: 'Admin'
}

const NewRequest = () => {
  const { user, loading } = useUser()
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState('')
  const createRequest = useCreateRequest();

  useEffect(() => {
    if (selectedRole) return

    if (user && user.role) {
      const role = Object.keys(roles).find(role => role != user.role) as string
      setSelectedRole(role)
    }
  }, [selectedRole, user])

  function handleChange(e: SelectChangeEvent) {
    setSelectedRole(e.target.value)
  }

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    closeSnackbar()
    try {
      await createRequest(selectedRole)
      enqueueSnackbar('Role requested successfully', { variant: 'success' });
      router.push('/requests')
    } catch (err) {
      enqueueSnackbar(getError(err), { variant: 'error' });
    }
  }

  if (loading) return <Loader />

  return (
    <Container maxWidth="sm" sx={{ minHeight: '80vh' }}>
      <Meta title="New Request" />
      <form onSubmit={submitHandler}>
        <Typography variant="h1" component="h1" sx={{ textAlign: 'center' }}>
          New Role Request
        </Typography>
        <FormControl sx={{ width: '100%' }}>
          <InputLabel id="role-label">Role</InputLabel>
          <Select
            value={selectedRole}
            onChange={handleChange}
            id="role"
            label="Role"
            sx={{ mb: 2 }}
          >
            {Object.keys(roles).map((key, index) => (
              key != user.role && <MenuItem key={key} value={key}>{roles[key as keyof ROLES]}</MenuItem>
            ))}
          </Select>
          <Button variant="contained" type="submit" fullWidth color="primary">
            <Typography>Submit</Typography>
          </Button>
        </FormControl>
      </form>
    </Container>
  )
}

export default Protected(NewRequest)
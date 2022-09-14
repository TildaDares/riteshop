import React, { useEffect } from 'react'
import AdminProtected from '@/components/admin/AdminProtected';
import UserProfile from '@/components/users/UserProfile';
import useUser from '@/hooks/user/useUser';
import { useRouter } from 'next/router';
import useUserById from '@/hooks/user/useUserById';
import { useSnackbar } from 'notistack';
import Error from '@/components/Error'
import Loader from '@/components/layout/Loader';
import { getError } from '@/utils/error';

const Profile = () => {
  const router = useRouter()
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { user: currentUser } = useUser()
  const id = router.query['id'] as string
  const { user, loading, error } = useUserById(id)

  useEffect(() => {
    closeSnackbar()
    if (currentUser && currentUser._id.toString() == id) {
      router.push('/profile')
      return;
    }

  }, [closeSnackbar, currentUser, enqueueSnackbar, id, router])

  if (error) {
    return <Error message={getError(error)} />
  }

  if (loading) return <Loader />

  return (
    <UserProfile title="Edit Profile" user={user} loading={loading} />
  )
}

export default AdminProtected(Profile)

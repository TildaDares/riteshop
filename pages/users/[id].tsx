import React, { useEffect } from 'react'
import Protected from '@/components/Protected';
import UserProfile from '@/components/UserProfile';
import useUser from '@/hooks/user/useUser';
import { useRouter } from 'next/router';
import useUserById from '@/hooks/user/useUserById';
import { useSnackbar } from 'notistack';
import Loader from '@/components/Loader';

const Profile = () => {
  const router = useRouter()
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { user: currentUser } = useUser()
  const id = router.query['id'] as string
  const { user, loading } = useUserById(id)

  useEffect(() => {
    if (!currentUser || !user) return
    closeSnackbar()
    if (currentUser._id.toString() == user._id.toString()) {
      router.push('/profile')
      return;
    }

    if (currentUser && currentUser.role !== 'admin') {
      enqueueSnackbar("You don't have enough permissions to view this page", { variant: 'error' });
      router.push('/')
      return
    }
  }, [closeSnackbar, currentUser, enqueueSnackbar, router, user])

  if (loading) return <Loader />

  return (
    <UserProfile title="Your Profile" user={user} loading={loading} />
  )
}

export default Protected(Profile)

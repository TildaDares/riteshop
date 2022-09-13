import React from 'react'
import Protected from '@/components/auth/Protected';
import UserProfile from '@/components/users/UserProfile';
import useUser from '@/hooks/user/useUser';

const Profile = () => {
  const { user, loading } = useUser()

  return (
    <UserProfile title="Your Profile" user={user} loading={loading} />
  )
}

export default Protected(Profile)
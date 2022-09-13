import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import useUser from '@/hooks/user/useUser';
import Loader from '@/components/layout/Loader';
import { useSnackbar } from 'notistack';

const AdminProtected = (Component: React.ComponentType) => {
  const WrapperComponent = () => {
    const { enqueueSnackbar } = useSnackbar();
    const { user: currentUser, loading } = useUser();
    const router = useRouter();

    useEffect(() => {
      if (!router.isReady || loading) return;

      if (!currentUser) {
        router.push(`/login?redirect=${router.asPath}`);
      }

      if (currentUser && currentUser.role !== 'admin') {
        enqueueSnackbar("You don't have enough permissions to view this page", { variant: 'error' })
        router.push('/');
      }
    }, [currentUser, enqueueSnackbar, loading, router]);

    if (currentUser && currentUser.role == 'admin') {
      return <Component />;
    }

    return (
      <Loader />
    );
  };

  return WrapperComponent;
};

export default AdminProtected;

import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import useUser from '@/hooks/user/useUser';
import Loader from '@/components/layout/Loader';

const Protected = (Component: React.ComponentType) => {
  const WrapperComponent = () => {
    const { user: currentUser, loading } = useUser();
    const router = useRouter();

    useEffect(() => {
      if (!router.isReady) return;
      if (!loading && !currentUser) {
        router.push(`/login?redirect=${router.asPath}`);
      }
    }, [currentUser, loading, router]);

    if (currentUser) {
      return <Component />;
    }

    return (
      <Loader />
    );
  };

  return WrapperComponent;
};

export default Protected;

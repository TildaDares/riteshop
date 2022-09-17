import { useCallback } from 'react';
import { autoLogin } from '@/utils/auth';
import axiosInstance from '@/utils/axiosConfig'

const useRegister = () => {
  return useCallback(async (name: string, email: string, password: string) => {
    const res = await axiosInstance.post('users/register', {
      name,
      email,
      password,
    });
    autoLogin(res.data.token)
  }, []);
}

export default useRegister

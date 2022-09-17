import { useCallback } from 'react';
import { autoLogin } from '@/utils/auth';
import axiosInstance from '@/utils/axiosConfig'

const useLogin = () => {
  return useCallback(async (email: string, password: string) => {
    const res = await axiosInstance.post('users/login', {
      email,
      password,
    });
    autoLogin(res.data.token)
  }, []);
}

export default useLogin

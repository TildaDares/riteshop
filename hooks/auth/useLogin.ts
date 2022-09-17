import { useCallback } from 'react';
import { postData } from '@/utils/fetchData'
import { autoLogin } from '@/utils/auth';

const useLogin = () => {
  return useCallback(async (email: string, password: string) => {
    const data = await postData('users/login', {
      email,
      password,
    });
    autoLogin(data.token)
  }, []);
}

export default useLogin

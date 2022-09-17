import { useCallback } from 'react';
import { postData } from '@/utils/fetchData'
import { autoLogin } from '@/utils/auth';

const useRegister = () => {
  return useCallback(async (name: string, email: string, password: string) => {
    const data = await postData('users/register', {
      name,
      email,
      password,
    });
    autoLogin(data.token)
  }, []);
}

export default useRegister

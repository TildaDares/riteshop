import { useCallback } from 'react';
import { postData } from '@/utils/fetchData'
import Cookies from 'js-cookie'

const useRegister = () => {
  return useCallback(async (name: string, email: string, password: string) => {
    const data = await postData('users/register', {
      name,
      email,
      password,
    });
    Cookies.set('authToken', data.token, { expires: 1 });
  }, []);
}

export default useRegister

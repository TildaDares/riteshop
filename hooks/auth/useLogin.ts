import { useCallback } from 'react';
import { postData } from '@/utils/fetchData'
import Cookies from 'js-cookie'

const useLogin = () => {
  return useCallback(async (email: string, password: string) => {
    const data = await postData('users/login', {
      email,
      password,
    });
    Cookies.set('authToken', data.token, { expires: 1 });
  }, []);
}

export default useLogin

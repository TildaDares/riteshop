import Cookies from 'js-cookie'
import axiosInstance from '@/utils/axiosConfig';

export const setAuthToken = (token: string) => {
  axiosInstance.defaults.headers.common['Authorization'] = '';
  delete axiosInstance.defaults.headers.common['Authorization'];

  if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
};

export const deleteAuthToken = () => {
  axiosInstance.defaults.headers.common['Authorization'] = '';
  delete axiosInstance.defaults.headers.common['Authorization'];
};

export const autoLogin = (token: string) => {
  Cookies.set('authToken', token, { expires: 1 });
  setAuthToken(token);
};

export const autoLogout = () => {
  Cookies.remove('authToken');
  deleteAuthToken();
};

import axios from 'axios';
import Cookies from 'js-cookie'

const instance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_DB_HOST}/api/`,
});

const token = Cookies.get('authToken')

if (token) {
  instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default instance;

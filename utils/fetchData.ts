import axios from 'axios'
import Cookies from 'js-cookie'

const baseURL = process.env.NEXT_PUBLIC_DB_HOST
const token = Cookies.get('authToken')
const getData = async (url: string) => {
  console.log(token)
  const res = await axios.get(`${baseURL}/api/${url}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })

  return res.data
}

const postData = async (url: string, data: { email: string; password: string }, token?: string) => {
  const res = await axios.post(`${baseURL}/api/${url}`, data, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  return res.data
}

export { getData, postData }
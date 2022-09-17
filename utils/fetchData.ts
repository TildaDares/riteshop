import axios, { AxiosRequestConfig } from 'axios'
import axiosInstance from '@/utils/axiosConfig'

const getData = async (url: string) => {
  const res = await axiosInstance.get(`/api/${url}`)
  return res.data
}

const postData = async (url: string, data?: unknown) => {
  const res = await axiosInstance.post(`/api/${url}`, data)
  return res.data
}

const putData = async (url: string, data?: unknown) => {
  const res = await axiosInstance.put(`/api/${url}`, data)
  return res.data
}

const deleteData = async (url: string, data?: AxiosRequestConfig<any> | undefined) => {
  const res = await axiosInstance.delete(`/api/${url}`, data)
  return res.data
}

export { getData, postData, putData, deleteData }
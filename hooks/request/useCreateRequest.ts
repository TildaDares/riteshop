import { useCallback } from 'react';
import { mutate } from 'swr';
import axiosInstance from '@/utils/axiosConfig'

const useCreateRequest = () => {
  return useCallback(async (requestedRole: string) => {
    const res = await axiosInstance.post('request-role', {
      requestedRole
    });
    mutate('request-role')
    return res.data
  }, []);
}

export default useCreateRequest

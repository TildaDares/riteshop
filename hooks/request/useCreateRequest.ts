import { useCallback } from 'react';
import { postData } from '@/utils/fetchData'
import { mutate } from 'swr';

const useCreateRequest = () => {
  return useCallback(async (requestedRole: string) => {
    const data = await postData('request-role', {
      requestedRole
    });
    mutate('request-role')

    return data
  }, []);
}

export default useCreateRequest

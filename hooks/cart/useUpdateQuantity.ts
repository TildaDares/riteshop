import { useCallback } from 'react';
import { mutate } from 'swr';
import axiosInstance from '@/utils/axiosConfig'

const useUpdateQuantity = () => {
  return useCallback(async (product: string, quantity: number) => {
    const res = await axiosInstance.put('cart', {
      item: {
        product,
        quantity,
      }
    });
    mutate('cart')

    return res.data
  }, []);
}

export default useUpdateQuantity

import { useCallback } from 'react';
import { putData } from '@/utils/fetchData'
import { mutate } from 'swr';

const useUpdateQuantity = () => {
  return useCallback(async (product: string, quantity: number) => {
    const data = await putData('cart', {
      item: {
        product,
        quantity,
      }
    });
    mutate('cart')

    return data
  }, []);
}

export default useUpdateQuantity

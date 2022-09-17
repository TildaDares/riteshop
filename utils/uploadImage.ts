import axios from 'axios';
import { getError } from '@/utils/error';

export const uploadImage = async (image: Blob) => {
  try {
    const data = new FormData()
    data.append("file", image)
    data.append("upload_preset", process.env.NEXT_PUBLIC_UPLOAD_PRESET as string)
    data.append("cloud_name", process.env.NEXT_PUBLIC_CLOUD_NAME as string)
    const img = await axios
      .post(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
    return img.data.secure_url as string
  } catch (error) {
    throw new Error(getError(error))
  }
}

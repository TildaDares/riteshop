export interface Product {
  _id?: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image?: string | Buffer | Blob;
  createdAt?: string
}

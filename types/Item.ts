import { Product } from "@/types/Product";

export interface Item {
  _id: string;
  product: Product;
  quantity: number;
}

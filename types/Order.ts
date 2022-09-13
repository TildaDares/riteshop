import React from "react";
import { Address } from "@/types/Address";
import { Item } from "@/types/Item";
import { User } from "@/types/User";

export interface Order {
  _id?: string,
  items: Item[],
  itemsPrice: number,
  shippingFee: number,
  total: number,
  shippingAddress: Address,
  isDelivered?: boolean,
  isPaid?: boolean,
  deliveredAt?: Date,
  createdAt?: Date,
  user?: User,
  children?: React.ReactElement
}

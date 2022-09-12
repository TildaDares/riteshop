import React from "react";
import { Address } from "@/types/Address";
import { Item } from "@/types/Item";

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
  children?: React.ReactElement
}

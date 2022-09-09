import React from "react";
import { Address } from "@/types/Address";
import { Item } from "@/types/Item";

export interface OrderProps {
  items: Item[],
  itemsPrice: number,
  shippingFee: number,
  totalPrice: number,
  shippingAddress: Address,
  isDelivered?: boolean,
  isPaid?: boolean,
  deliveredAt?: Date,
  children: React.ReactElement
}

export interface Column {
  id: '_id' | 'price' | 'createdAt' | 'quantity' | 'isDelivered' | 'actions';
  label: string;
  minWidth?: number;
  align?: 'right';
}

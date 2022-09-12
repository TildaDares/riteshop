export interface Column {
  id: '_id' | 'total' | 'createdAt' | 'isPaid' | 'isDelivered';
  label: string;
  minWidth?: number;
  align?: 'right';
}

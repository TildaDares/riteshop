export interface Column {
  id: '_id' | 'role' | 'createdAt' | 'orders';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: string) => string;
}

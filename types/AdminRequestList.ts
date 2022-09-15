export interface Column {
  id: '_id' | 'currentRole' | 'user' | 'requestedRole' | 'createdAt' | 'status';
  label: string;
  minWidth?: number;
  align?: 'right';
}

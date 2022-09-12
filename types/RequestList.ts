export type StatusColors = {
  rejected: string,
  approved: string,
  pending: string,
}

export interface Column {
  id: '_id' | 'requestedRole' | 'createdAt' | 'status';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: string) => string;
}

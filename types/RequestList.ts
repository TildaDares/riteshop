export type StatusColors = {
  REJECTED: string,
  APPROVED: string,
  PENDING: string,
}

export interface Column {
  id: '_id' | 'requestedRole' | 'createdAt' | 'status';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: string) => string;
}

export interface Request {
  _id: string;
  status: string;
  reviewer?: string;
  requester: string;
  requestedRole: string;
  createdAt: Date;
}

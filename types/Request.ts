import { User } from "@/types/User";

export interface Request {
  _id: string;
  status: string;
  reviewer?: string;
  requester: string | User;
  requestedRole: string;
  createdAt: Date;
}

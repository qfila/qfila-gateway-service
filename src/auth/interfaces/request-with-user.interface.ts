import { Request as ExpressRequest } from 'express';

export interface User {
  id: string;
  username: string;
  email: string;
}

export interface RequestWithUser extends ExpressRequest {
  user: User;
}

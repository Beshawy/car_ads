import { Request, Response, NextFunction } from 'express';

declare global {
  namespace Express {
    interface User {
      id: number;
      email: string;
      [key: string]: any;
    }
  }
}

export interface AuthenticatedRequest extends Request {
  user?: {
    id: number;
    email: string;
  };
}

export type AsyncRequestHandler = (
  req: Request | AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => Promise<any>;

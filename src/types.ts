import { Request, Response, NextFunction } from 'express';

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

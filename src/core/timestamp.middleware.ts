import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

export function timestampMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  req['timestamp'] = Date.now();
  next();
}

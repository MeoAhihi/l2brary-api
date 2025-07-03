import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

export function logger(req: Request, res: Response, next: NextFunction) {
  const { method, originalUrl } = req;
  const start = Date.now();

  res.on('finish', () => {
    const { statusCode } = res;
    const duration = Date.now() - start;
    Logger.log(
      `${method} ${originalUrl} ${statusCode} - ${duration}ms`,
      'Request',
    );
  });

  next();
}

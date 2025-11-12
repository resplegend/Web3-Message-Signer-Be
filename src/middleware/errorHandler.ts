import type { NextFunction } from 'express';

export function notFoundHandler(_req: any, res: any) {
  res.status(404).json({
    message: 'Route not found',
  });
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(err: unknown, _req: any, res: any, _next: NextFunction) {
  if (err instanceof Error) {
    res.status(500).json({
      message: err.message,
    });
    return;
  }

  res.status(500).json({
    message: 'Unexpected server error',
  });
}

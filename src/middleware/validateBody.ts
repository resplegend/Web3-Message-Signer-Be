import type {RequestHandler } from 'express';
import type { TypeOf, ZodTypeAny } from 'zod';

export const validateBody = <T extends ZodTypeAny>(schema: T): RequestHandler<unknown, unknown, TypeOf<T>> =>
  (req:any, res: any, next: any) => {
    const parsed = schema.safeParse(req.body);

    if (!parsed.success) {
      const issues = parsed.error.issues.map((issue) => ({
        path: issue.path.filter((segment): segment is string | number => typeof segment !== 'symbol'),
        message: issue.message,
      }));

      res.status(400).json({
        isValid: false,
        signer: null,
        originalMessage: '',
        reason: 'Invalid payload',
        issues,
      });
      return;
    }

    req.body = parsed.data as TypeOf<T>;
    next();
  };

import { Router } from 'express';
import { z } from 'zod';

import { verifySignature } from '../services/verifySignature';
import type { VerifySignatureResult } from '../services/verifySignature';

const signatureSchema = z.object({
  message: z.string().trim().min(1, { message: 'Message cannot be empty' }),
  signature: z
    .string()
    .regex(/^0x[0-9a-fA-F]+$/, {
      message: 'Signature must be a 0x-prefixed hex string',
    }),
});

const verifySignatureRouter = Router();

verifySignatureRouter.post<unknown, VerifySignatureResult>('/', async (req, res) => {
  const parsed = signatureSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({
      isValid: false,
      signer: null,
      originalMessage: '',
      reason: 'Invalid payload',
      issues: parsed.error.issues.map((issue) => ({
        path: issue.path.filter((segment): segment is string | number => typeof segment !== 'symbol'),
        message: issue.message,
      })),
    });
    return;
  }

  const { message, signature } = parsed.data;
  const result = await verifySignature({ message, signature: signature as `0x${string}` });

  res.status(200).json(result);
});

export { verifySignatureRouter };



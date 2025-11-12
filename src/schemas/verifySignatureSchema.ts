import { z } from 'zod';

export const verifySignatureBodySchema = z.object({
  message: z.string().trim().min(1, { message: 'Message cannot be empty' }),
  signature: z
    .string()
    .regex(/^0x[0-9a-fA-F]+$/, {
      message: 'Signature must be a 0x-prefixed hex string',
    }),
});

export type VerifySignatureBody = z.infer<typeof verifySignatureBodySchema>;

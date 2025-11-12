import { verifySignature } from '../services/verifySignature';

export async function verifySignatureController(
  req: any,
  res: any,
) {
  const { message, signature } = req.body;

  const result = await verifySignature({
    message,
    signature: signature as `0x${string}`,
  });

  res.status(200).json(result);
}

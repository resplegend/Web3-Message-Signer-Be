import { recoverMessageAddress, verifyMessage } from 'viem';

type Hex = `0x${string}`;

export type VerifySignaturePayload = {
  message: string;
  signature: Hex;
};

export type VerifySignatureResult = {
  isValid: boolean;
  signer: Hex | null;
  originalMessage: string;
  reason?: string;
  issues?: Array<{
    path: Array<string | number>;
    message: string;
  }>;
};

export async function verifySignature({ message, signature }: VerifySignaturePayload): Promise<VerifySignatureResult> {
  try {
    const recoveredAddress = await recoverMessageAddress({
      message,
      signature,
    });

    const isValid = await verifyMessage({
      address: recoveredAddress,
      message,
      signature,
    });

    if (!isValid) {
      return {
        isValid: false,
        signer: null,
        originalMessage: message,
        reason: 'Signature does not match recovered address.',
      };
    }

    return {
      isValid: true,
      signer: recoveredAddress,
      originalMessage: message,
    };
  } catch (error) {
    return {
      isValid: false,
      signer: null,
      originalMessage: message,
      reason: error instanceof Error ? error.message : 'Unknown error verifying signature.',
    };
  }
}



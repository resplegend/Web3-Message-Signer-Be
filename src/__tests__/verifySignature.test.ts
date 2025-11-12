import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { privateKeyToAccount } from 'viem/accounts';

import { app } from '../app';

const testAccount = privateKeyToAccount(
  '0x0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef',
);

const url = '/api/verify-signature';

describe('POST /api/verify-signature', () => {
  it('rejects invalid payloads', async () => {
    const response = await request(app).post(url).send({
      message: '',
      signature: 'invalid',
    });

    expect(response.status).toBe(400);
    expect(response.body.isValid).toBe(false);
    expect(response.body.reason).toBe('Invalid payload');
    expect(Array.isArray(response.body.issues)).toBe(true);
  });

  it('returns isValid=true for a correct signature', async () => {
    const message = 'Sign me please';
    const signature = await testAccount.signMessage({ message });

    const response = await request(app).post(url).send({
      message,
      signature,
    });

    expect(response.status).toBe(200);
    expect(response.body.isValid).toBe(true);
    expect(response.body.signer).toEqual(testAccount.address);
    expect(response.body.originalMessage).toEqual(message);
    expect(response.body.reason).toBeUndefined();
  });

  it('returns isValid=false for an incorrect signature', async () => {
    const message = 'This will fail';
    const signature = await testAccount.signMessage({ message });
    const tamperedSignature = `${signature.slice(0, -1)}0`;

    const response = await request(app).post(url).send({
      message,
      signature: tamperedSignature,
    });

    expect(response.status).toBe(200);
    expect(response.body.isValid).toBe(false);
    expect(response.body.signer).toBeNull();
    expect(response.body.originalMessage).toEqual(message);
    expect(response.body.reason).toBeDefined();
  });
});

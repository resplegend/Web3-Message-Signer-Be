import { Router } from 'express';

import { verifySignatureRouter } from './verifySignature';

const apiRouter = Router();

apiRouter.use('/verify-signature', verifySignatureRouter);

export { apiRouter };

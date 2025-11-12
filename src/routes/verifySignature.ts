import { Router } from 'express';

import { verifySignatureController } from '../controllers/verifySignatureController';
import { validateBody } from '../middleware/validateBody';
import { verifySignatureBodySchema } from '../schemas/verifySignatureSchema';

const verifySignatureRouter = Router();

verifySignatureRouter.post('/', validateBody(verifySignatureBodySchema), verifySignatureController);

export { verifySignatureRouter };



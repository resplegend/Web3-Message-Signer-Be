import { Router } from 'express';

import { verifySignatureController } from '../controllers/verifySignatureController';
import { validateBody } from '../middleware/validateBody';
import { verifySignatureBodySchema } from '../schemas/verifySignatureSchema';

const verifySignatureRouter = Router();

/**
 * @swagger
 * /api/verify-signature:
 *   post:
 *     summary: Verify a signed message
 *     tags: [Signature]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - message
 *               - signature
 *             properties:
 *               message:
 *                 type: string
 *                 example: "Hello Dynamic"
 *               signature:
 *                 type: string
 *                 example: "0xabc123..."
 *     responses:
 *       200:
 *         description: Verification result
 *       400:
 *         description: Validation error
 */
verifySignatureRouter.post('/', validateBody(verifySignatureBodySchema), verifySignatureController);

export { verifySignatureRouter };



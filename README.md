Express + TypeScript API that verifies signed Ethereum messages using **viem**. Provides a single `POST /api/verify-signature` endpoint plus Swagger documentation.

## Requirements
- Node.js 18+

## Setup
1. Install dependencies
   ```bash
   npm install
   ```
2. Development server
   ```bash
   npm run dev
   ```
   Starts on [http://localhost:4000](http://localhost:4000).
3. Production build & run
   ```bash
   npm run build
   npm start
   ```
4. Environment variables
   - `PORT` (optional, default `4000`).

## Scripts
- `npm run dev` — start with tsx watch mode
- `npm run build` — compile to `dist`
- `npm start` — run compiled output
- `npm run test` — Vitest suite
- `npm run lint` (optional setup) — add ESLint config if desired

## Project Structure
```
src/
├─ app.ts                 # Express app & routes mounting
├─ index.ts               # HTTP server entry point
├─ config/
│  └─ swagger.ts          # Swagger/OpenAPI configuration
├─ controllers/
│  └─ verifySignatureController.ts
├─ middleware/
│  ├─ validateBody.ts
│  └─ errorHandler.ts
├─ routes/
│  ├─ index.ts            # Registers feature routers
│  └─ verifySignature.ts
├─ schemas/
│  └─ verifySignatureSchema.ts
├─ services/
│  └─ verifySignature.ts  # viem signature verification
└─ __tests__/
   └─ verifySignature.test.ts
```

## API
### `GET /health`
Returns `{ status: "ok" }` for health checks.

### `POST /api/verify-signature`
Body:
```json
{
  "message": "Hello",
  "signature": "0xabc123..."
}
```
Response:
```json
{
  "isValid": true,
  "signer": "0x...",
  "originalMessage": "Hello"
}
```

## Swagger Documentation
- Available at [http://localhost:4000/docs](http://localhost:4000/docs) once the server runs.
- OpenAPI spec generated via `swagger-jsdoc` with annotations inside route files.

## Testing
```bash
npm run test     # runs Vitest suite
npx tsc --noEmit # confirm TypeScript passes
```

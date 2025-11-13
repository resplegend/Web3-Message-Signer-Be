import swaggerJsdoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Web3 Message Signer API',
    version: '1.0.0',
    description: 'API documentation for the signature verification service.',
  },
};

export const swaggerSpec = swaggerJsdoc({
  swaggerDefinition,
  apis: ['src/routes/**/*.ts'],
});


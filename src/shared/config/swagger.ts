import swaggerJsDoc from 'swagger-jsdoc';

const options: swaggerJsDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Car Ads API',
      version: '1.0.0',
      description: 'API documentation for the Car Ads platform',
    },
    servers: [
      {
        url: 'http://localhost:7000',
        description: 'Local development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  // Path to the API docs (it checks comments in these files)
  apis: ['./src/modules/**/*.ts', './src/app.ts'], 
};

export const swaggerSpecs = swaggerJsDoc(options);

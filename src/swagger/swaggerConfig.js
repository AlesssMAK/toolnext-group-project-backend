import swaggerJsdoc from 'swagger-jsdoc';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'ToolNext API Documentation',
    version: '1.0.0',
    description: 'API documentation for ToolNext - Tool Rental Platform',
    contact: {
      name: 'ToolNext API Support',
      email: 'makovii88@gmail.com',
    },
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Development server',
    },
  ],
  components: {
    securitySchemes: {
      cookieAuth: {
        type: 'apiKey',
        in: 'cookie',
        name: 'sessionId',
        description: 'Session ID cookie for authentication',
      },
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  security: [
    {
      cookieAuth: [],
    },
  ],
};

const options = {
  definition: swaggerDefinition,
  apis: [
    path.join(__dirname, './paths/*.js'),
    path.join(__dirname, './schemas/*.js'),
  ],
};

export const swaggerSpec = swaggerJsdoc(options);

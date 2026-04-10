export const swaggerSpecs = {
  openapi: '3.0.0',
  info: {
    title: 'Car Ads API',
    version: '1.0.0',
    description: 'API documentation for the Car Ads platform',
  },
  servers: [
    { url: 'https://car-ads-beshawys-projects.vercel.app', description: 'Production server' },
    { url: 'http://localhost:7000', description: 'Local server' },
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
  paths: {
    '/api/v1/auth/register': {
      post: {
        tags: ['Authentication'],
        summary: 'Register a new user',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['name', 'email', 'password'],
                properties: {
                  name: { type: 'string', example: 'John Doe' },
                  email: { type: 'string', format: 'email', example: 'john@example.com' },
                  password: { type: 'string', format: 'password', example: 'StrongPassword123' },
                  phone: { type: 'string', example: '01012345678' }
                }
              }
            }
          }
        },
        responses: { 201: { description: 'User created successfully' }, 400: { description: 'Validation Error or User Exists' } }
      }
    },
    '/api/v1/auth/login': {
      post: {
        tags: ['Authentication'],
        summary: 'Login user',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['email', 'password'],
                properties: {
                  email: { type: 'string', format: 'email', example: 'john@example.com' },
                  password: { type: 'string', format: 'password', example: 'StrongPassword123' }
                }
              }
            }
          }
        },
        responses: { 200: { description: 'Login successful (Returns JWT Token)' }, 401: { description: 'Invalid Credentials' } }
      }
    },
    '/api/v1/auth/forgot-password': {
      post: {
        tags: ['Authentication'],
        summary: 'Request password reset code via email',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['email'],
                properties: {
                  email: { type: 'string', format: 'email', example: 'john@example.com' }
                }
              }
            }
          }
        },
        responses: { 200: { description: 'Reset code sent to email' }, 404: { description: 'User not found' } }
      }
    },
    '/api/v1/auth/verify-code': {
      post: {
        tags: ['Authentication'],
        summary: 'Verify password reset code',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['code'],
                properties: {
                  code: { type: 'string', example: '123456' }
                }
              }
            }
          }
        },
        responses: { 200: { description: 'Code verified successfully' }, 400: { description: 'Invalid or expired code' } }
      }
    },
    '/api/v1/auth/reset-password': {
      post: {
        tags: ['Authentication'],
        summary: 'Reset password using verified code',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['email', 'code', 'newPassword'],
                properties: {
                  email: { type: 'string', format: 'email', example: 'john@example.com' },
                  code: { type: 'string', example: '123456' },
                  newPassword: { type: 'string', format: 'password', example: 'NewStrongPassword123' }
                }
              }
            }
          }
        },
        responses: { 200: { description: 'Password reset successful' }, 400: { description: 'Invalid code or email' } }
      }
    },
    '/api/v1/auth/logout': {
      post: {
        tags: ['Authentication'],
        summary: 'Logout user',
        security: [{ bearerAuth: [] }],
        responses: { 200: { description: 'Logout successful' }, 401: { description: 'Unauthorized' } }
      }
    },
    '/api/v1/auth/google': {
      get: {
        tags: ['Authentication'],
        summary: 'Initiate Google OAuth Login (Open this link in Browser)',
        responses: { 302: { description: 'Redirects to Google Consent screen' } }
      }
    }
  }
};

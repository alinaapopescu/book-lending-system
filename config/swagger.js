const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
  title: 'book-lending-system',
  version: '1.0.0',
  description: 'University project',
  },
  };
  
  const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'], // Path to the API routes in your Node.js application
  };
  
  const swaggerSpec = swaggerJSDoc(options);
  module.exports = swaggerSpec;
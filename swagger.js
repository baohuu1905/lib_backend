const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' });

const doc = {
  info: {
    title: 'Library Management API',
    description: 'API documentation for the Library Management system'
  },
  host: 'localhost:8080',
  schemes: ['http'],  
};

const outputFile = './swagger-output.json';
const routes = ['./src/routers/index.js'];

swaggerAutogen(outputFile, routes, doc)

// .then(() => {
//   require('./src/routers/index.js')
// });

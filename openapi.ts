const swaggerJsdoc = require('swagger-jsdoc');
const fs = require("fs");

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Lethean Clientside API',
            version: '1.0.0',
        },
    },
    apis: ['./src/**/*.ts'], // files containing annotations as above
};

const openapiSpecification = swaggerJsdoc(options);

fs.writeFileSync('openapi.json', JSON.stringify(openapiSpecification))

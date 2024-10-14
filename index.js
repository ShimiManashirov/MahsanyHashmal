// index.js
import express from 'express';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import userRoutes from './routes/userRoutes.js';

const app = express();
const port = 3000;

// Swagger definition
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Express API',
            version: '1.0.0',
            description: 'API documentation for an Express app',
        },
        servers: [
            {
                url: 'http://localhost:3000',
            },
        ],
    },
    apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Include the user routes
app.use('/', userRoutes);

// Setup function
async function setup() {
    console.log('Performing initial setup...');
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated async task
    console.log('Setup complete.');
}

// Start server function
export async function startServer() {
    await setup();
    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
        console.log(`API documentation is available at http://localhost:${port}/api-docs`);
    });
}

// Execute the function to start the server
startServer();

// index.js
import express from 'express';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import router from './routes/userRoutes.js';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}))
const port = 3000;

// Swagger definition
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Ozile Made KupaRashit Electric!',
            version: '1.0.0',
            description: 'Hi everyone!',
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
app.use('/', router);

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


startServer()
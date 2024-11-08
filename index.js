// index.js
import express from 'express';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import router from './routes/userRoutes.js';
import product_router from './routes/productsRoutes.js'
import bodyParser from 'body-parser';
import cors from 'cors'

const app = express();
const port = 696    ;
const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // enable set cookie
    optionsSuccessStatus: 204 // for legacy browser support
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Allow preflight requests for all routes
app.use(express.json());
app.use(bodyParser.urlencoded({extended : true}));

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
                url: `http://0.0.0.0:${port}`,
            },
        ],
    },
    apis: ['./routes/*.js'],
};


const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Include the user routes
app.use('/', router);
app.use('/', product_router)

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
        console.log(`Server is running at http://0.0.0.0:${port}`);
        console.log(`API documentation is available at http://0.0.0.0:${port}/api-docs`);
    });
}

// Execute the function to start the server


startServer()
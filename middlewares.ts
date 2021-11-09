import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import * as swaggerUi from 'swagger-ui-express';
import swaggerDocument from './config/swagger';
import compression from 'compression';
import hpp from 'hpp';

export const middlewares = (app: any) => {
    // middlewares
    app.use(helmet()); //  protects the routes with secured http parameters
    app.use(morgan('tiny')); // logs the activity in runtime
    app.use(compression()) // compress/decompress the request.
    app.use(hpp());
    app.use(cors({
        origin: '*',
        optionsSuccessStatus: 200
    })); // allows only the origin mentioned here
    app.use(express.json({ limit: '50mb' }));
    app.use(express.urlencoded({ extended: false, limit: '50mb' }));
    app.use('/apiDoc', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
        explorer: true
    }));

}


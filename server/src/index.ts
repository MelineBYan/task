import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from './swagger.json';
import UserApi from './api/user.api';
import WorkspaceApi from './api/workspace.api';
import UrlApi from './api/url.api';
import connect from './db/config';
import passport from 'passport';
import { applyPassportStrategy } from './config/passport';
import errorHandler from './core/errorHandler/errorHandler';
dotenv.config({ path: './envs/.env' });

const app = express();

// Apply strategy to passport
applyPassportStrategy(passport);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.set('showStackError', true);
app.use((_req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    );
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-Requested-With,content-type',
    );
    next();
});
connect();
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/user', UserApi);
app.use('/workspace', WorkspaceApi);
app.use('/url', UrlApi);
errorHandler(app);
const port = process.env.PORT || 8000;

app.listen(port, () => {
    return console.log(`Server is listening on ${port}`);
});

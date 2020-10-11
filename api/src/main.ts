import * as express from 'express';
/// import { ValidateErrorJSON } from './models/validate.json-error'
import { ValidateError } from 'tsoa';
/// import  HttpException  from './exceptions/HttpException';
import  expressHttpErrorMiddleware  from './exceptions/http.error.middleware';

import { RegisterRoutes } from './routes/routes';  // cet import permet l'enrÃ´lement des routes gÃ©nÃ©rÃ©es par tsoa
// const path = require('path');
import * as path from 'path';
import * as multer from 'multer';
import * as bodyParser from 'body-parser';


const workspacepath: string = process.env.POKUS_WKSP

const app = express();
const port = 3000;

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

// app.get('/', (req, res) => res.send('Hello World!'));
RegisterRoutes(app);  // permet l'enrÃ´lement des routes gÃ©nÃ©rÃ©es par tsoa

// ---
// -- error handler Express Middleware for non-TSOA Errors
app.use(expressHttpErrorMiddleware);

app.listen(port, () => console.log(`Server started listening to port ${port}`));

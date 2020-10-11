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
/*
// ---
// -- error handler Express Middleware for TSOA
app.use(function errorHandler(
  err: ValidateError,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): express.Response | void {

  /// ---
  /// This Error handling is tied to definition on interfaces for
  /// JSON Payload (like [PrimaryColorCreationParams] in [api/src/models/PrimaryColorService.ts]), and
  /// definition of @Query and @Path Parameters
  if (err instanceof ValidateError) {
    console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
    return res.status(422).json({
      message: "Received Request TSOA Validation Failed (Your HTTP Request does not comply with TSOA Endpoint Specification)",
      details: err?.fields,
    });
  }
  /*
  if (err instanceof HttpException) {
    /// let { statusCode, message } = err;
    return res.status(err.status).json({
      message: `Http Error for [kaleidoscopic] API, statuscode is [${err.status}] error is ` + `[${JSON.stringify(err, null, " ")}]`,
    });
  }*/
  /*
  /// ---
  /// Non-TSOA Errors are Express Errors, so 500 Internal Server Error
  if (err instanceof Error) {
    /// let { statusCode, message } = err;
    /// console.log(`[${err.statusCode}][${JSON.stringify(err, null, " ")}]`)
    return res.status(500).json({
      message: "Internal Server Error for [kaleidoscopic] API, error is " + `[${JSON.stringify(err, null, " ")}]`,
    });
  }*/
/*
  next();
}); */


app.listen(port, () => console.log(`Server started listening to port ${port}`));

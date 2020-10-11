import * as express from 'express';
import { ValidateErrorJSON } from './models/validate.json-error'

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
// -- error handler to validate JSON structure for example
app.use(function errorHandler(
  err: unknown,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): express.Response | void {
  /*
  if (err instanceof ValidateErrorJSON) {
    console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
    return res.status(422).json({
      message: "Validation Failed",
      details: err?.fields,
    });
  }*/
  if (err instanceof Error) {
    return res.status(500).json({
      message: "Internal Server Error for [kaleidoscopic] API, error is " + `[${JSON.stringify(err, null, " ")}]`,
    });
  }

  next();
});

app.listen(port, () => console.log(`Server started listening to port ${port}`));

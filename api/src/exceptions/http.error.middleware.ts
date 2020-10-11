import { NextFunction, Request, Response } from 'express';
import HttpException from '../exceptions/HttpException';
import { ValidateError } from 'tsoa';

function expressHttpErrorMiddleware(error: HttpException, request: Request, response: Response, next: NextFunction) : Response | void {
    console.warn(`Express Server for [kaleidoscopic] API [expressHttpErrorMiddleware] will handle HTTP Erros differently for Requests Path starting with [${request.path}], and others`);
    if (error instanceof ValidateError) {
      console.warn(`Caught Validation Error for ${request.path}:`, error.fields);
      return response.status(422).json({
        message: "Received Request TSOA Validation Failed (Your HTTP Request does not comply with TSOA Endpoint Specification)",
        details: error?.fields,
      });
    } else {
      if (request.path.startsWith('/api/v1')) {
        console.warn(`Express Server for [kaleidoscopic] API [expressHttpErrorMiddleware] Caught an HTTP [${error.status}] error for a Request Path starting with [/api/v1], Request path is [${request.path}]`, error.message);
      } else {
        console.warn(`Express Server for [kaleidoscopic] API [expressHttpErrorMiddleware] Caught an HTTP [${error.status}] error for a Request Path not starting with [/api/v1], Request path is [${request.path}]`, error.message);
      }
      console.warn(`Caught Express JS HTTP Server Validation Error for ${request.path}:`, error.message);
      const status = error.status || 500;
      const message = error.message || 'Http Error, Something went wrong';
      const body = error.body || null;
      const type = error.type || null;
      return response.status(status).json({
        message: "Received Request ExpressJS Validation Failed (Your HTTP Request does not comply with HTTP Server Specification)",
        error: {
          status: status,
          message: message,
          body: body,
          type: type
        },
      });
    }
    /*if (error instanceof ValidateError) {
      console.warn(`Caught Validation Error for ${request.path}:`, error.fields);
      return response.status(422).json({
        message: "Received Request TSOA Validation Failed (Your HTTP Request does not comply with TSOA Endpoint Specification)",
        details: error?.fields,
      });
    } else if (error instanceof HttpException) {
        console.warn(`Express Server for [kaleidoscopic] API [expressHttpErrorMiddleware] will handle HTTP Erros differently for Requests Path starting with [${request.path}], and others`);
        if (request.path.startsWith('/api/v1')) {
          console.warn(`Express Server for [kaleidoscopic] API [expressHttpErrorMiddleware] Caught an HTTP [${error.status}] error for a Request Path starting with [/api/v1], Request path is [${request.path}]`, error.message);
        } else {
          console.warn(`Express Server for [kaleidoscopic] API [expressHttpErrorMiddleware] Caught an HTTP [${error.status}] error for a Request Path not starting with [/api/v1], Request path is [${request.path}]`, error.message);
        }
        console.warn(`Caught Express JS HTTP Server Validation Error for ${request.path}:`, error.message);
        const status = error.status || 500;
        const message = error.message || 'Http Error, Something went wrong';
        const body = error.body || null;
        const type = error.type || null;
        return response.status(status).json({
          message: "Received Request ExpressJS Validation Failed (Your HTTP Request does not comply with HTTP Server Specification)",
          error: {
            status: status,
            message: message,
            body: body,
            type: type
          },
        });
    }*/
  /* HTML Error Response
  response
    .status(status)
    .send({
      status: status,
      message: message,
      body: body,
      type: type
    }) */
    next();
}

export default expressHttpErrorMiddleware;

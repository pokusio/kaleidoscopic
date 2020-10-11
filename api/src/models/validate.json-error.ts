import { Body, Controller, Post, Route, Response, SuccessResponse,ValidateError, FieldErrors } from "tsoa";

// I don't understand yet how to extendTSOA [ValidateError]forExpress Error Handling
// THis interface is unused
export interface ValidateErrorJSON extends ValidateError {
  ///message: "JSON Validation failed";
  message: string;
  missingProperties: string[];
  ///details: { [name: string]: unknown };
  status:number;
}

import { Body, Controller, Post, Route, Response, SuccessResponse } from "tsoa";

export interface ValidateErrorJSON {
  message: "Validation failed";
  details: { [name: string]: unknown };
  fields: string[];
}

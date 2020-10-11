import { PrimaryColor } from "../models/PrimaryColor";
import * as dtree from 'directory-tree';
import { ValidateErrorJSON } from './validate.json-error'

// A post request should not contain any color_guid, it shallbe generated when new color is inserted into mongoDB
/// export type PrimaryColorCreationParams = Pick<PrimaryColor,  "description" | "red" | "green" | "blue" | "opacity">;
export interface PrimaryColorCreationParams {
  // color_id: number; /// this is the primary key in the database, auto-increment
  // color_guid: string;/// 6c603f40-6abc-46ac-889e-08151658c7f7
  description: string;
  red: number;//"<0 to 255>"
  green: number;//"<0 to 255>"
  blue: number;//"<0 to 255>"
  opacity: number;//"<0 to 1>" 2 decimals maximum (for CSS compatibility) let myNumber: number = 0.87;let myNumber: number = 10.8788;
}

export class PrimaryColorService {

  public get(): PrimaryColor {
    console.log("Method not fully implemented : it should retireve the PrimaryColor from mongodb database, and return it as JSON")
    // TODO : retrieve UI Theme'sPrimary Color from database instead of the test JSON response below
    return {
      color_id: 15689,
      color_guid: "6c603f40-6abc-46ac-889e-08151658c7f7",
      red: 123,
      green: 45,
      blue: 210,
      opacity: .75,
      description: "A beautiful inspiring blue shade"
    };

  }


  public create(primaryColorCreationParams: PrimaryColorCreationParams): PrimaryColor {

    // TODO :
    // 1. generate GUID
    // 2. create the entry in the mongo db database, so that PrimaryColor is considered created
    // 3. return the created PrimaryColor instance

    return     {
          color_id: 993578, /// this is the primary key in the database, auto-increment, so never provided as argument
          color_guid: "6c603f40-6abc-46ac-889e-08151658c7f7", /// The GUID is generated when inserting into MongoDB, it should not ever be provided as parameter
          ...primaryColorCreationParams ///provided arguments are returned back in the Model instacne returned after creation (insertion into database)
          // maybe some other fields later.
        }; // inside the 'src/models/git' folder

  }
}

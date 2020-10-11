import { Controller, Get, Post, Body, Query, Route, SuccessResponse, Response, ValidateError } from 'tsoa';
import { PrimaryColor } from "../models/PrimaryColor";
import { PrimaryColorService, PrimaryColorCreationParams } from "../models/PrimaryColorService";
import { ValidateErrorJSON } from '../models/validate.json-error'

@Route('management/ui/theme/color')
export class ColorMangementController extends Controller {


    /**
     * @example red "204" <0 to 255>
     * @example green "204" <0 to 255>
     * @example blue "204" <0 to 255>
     * @example red "0.2" decimal, <0 to 1>, 2 decimals precision maximum
     */
    @Post()
    @SuccessResponse("201", "Created") // Custom success response
    @Response<ValidateError>(422, "JSON Validation Failed", {
      message: "JSON Validation failed",
      name: "JSON Validation error",
      status: 422,
      fields: { }
    }) // I don't understand yet how to manage Errors using @Response<T> from Express and ValidateError from TSOA
    /**
     *
     **/
    public async updateColor (
      @Body() requestBody: PrimaryColorCreationParams /// dans les requêtes POST, leJSON envoyé est dans le corps de la requête HTTP
      /// @Path() userId: UUID, ///si cétait dans lePath, ce serait du genre POST http://
      /// @Query() red: string /// si c'était dans la query ce seraitdu genre http://....?red=12&green=45&blue=150&description=super%20belle%20couleur
      /// @Query() green: string
      /// @Query() blue: string
      /// @Query() opacity: string
    ): Promise<PrimaryColor> {
      console.log({ msg: 'Réponse au Endpoint [POST /updateColor] ' });
      // throw new ValidateError({}, "")
      this.setStatus(201); // set return status 201
      return new PrimaryColorService().create({blue: requestBody.blue, description: requestBody.description, green: requestBody.green, opacity: requestBody.opacity, red: requestBody.red});
    }

}

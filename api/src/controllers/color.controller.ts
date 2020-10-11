import { Controller, Get, Post, Body, Query, Route } from 'tsoa';
import { PrimaryColor } from "../models/PrimaryColor";
import { PrimaryColorService, PrimaryColorCreationParams } from "../models/PrimaryColorService";

@Route('/ui/theme/color')
export class ColorController extends Controller {

    @Get()
    public msg() {
      let response: any = {
        red: "<0 to 255>",
        green: "<0 to 255>",
        blue: "<0 to 255>",
        opacity: "<0 to 255>"
      };
      console.log({ msg: 'Réponse au Endpoint [GET /color] ' })
      return response;
    }


}

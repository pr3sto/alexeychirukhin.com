import { Menu } from "../types/menu";
import { MenuResponse } from "../types/responses/menuResponse";
import MenuConverter from "../types/converters/menuConverter";
import MenuSchemaValidator from "./validators/menuSchemaValidator";
import Utility from "./utility";

export default class MenuApi {
  static async getAsync(url: string): Promise<Menu> {
    const validator = new MenuSchemaValidator();
    const response = await Utility.getAsync<MenuResponse>(url, validator);

    return MenuConverter.convertResponseToMenu(response);
  }
}

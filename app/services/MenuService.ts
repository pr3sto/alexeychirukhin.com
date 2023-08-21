import { Menu } from "../types/menu";
import { MenuResponse } from "../types/responses/menuResponse";
import MenuConverter from "../types/converters/MenuConverter";
import MenuSchemaValidator from "./validators/MenuSchemaValidator";
import Utility from "./Utility";

export default class MenuService {
  static async getAsync(url: string): Promise<Menu> {
    const validator = new MenuSchemaValidator();
    const response = await Utility.getAsync<MenuResponse>(url, validator);

    return MenuConverter.convertResponseToMenu(response);
  }
}
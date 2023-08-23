import { Menu } from "~/app/types/menu";
import { MenuResponse } from "~/app/types/responses/menuResponse";
import MenuConverter from "~/app/types/converters/MenuConverter";
import MenuSchemaValidator from "~/app/services/validators/MenuSchemaValidator";
import Utility from "~/app/services/Utility";

export default class MenuService {
  static async getAsync(url: string): Promise<Menu> {
    const validator = new MenuSchemaValidator();
    const response = await Utility.getAsync<MenuResponse>(url, validator);

    return MenuConverter.convertResponseToMenu(response);
  }
}

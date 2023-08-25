import { Menu } from "~/app/types/menu";
import MenuSchemaValidator from "~/app/services/validators/MenuSchemaValidator";
import Utility from "~/app/services/Utility";

export default class MenuService {
  static async getAsync(url: string): Promise<Menu> {
    const validator = new MenuSchemaValidator();
    return await Utility.getAsync<Menu>(url, validator);
  }
}

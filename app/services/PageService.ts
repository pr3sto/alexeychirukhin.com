import { Page } from "~/app/types/page";
import PageSchemaValidator from "~/app/services/validators/PageSchemaValidator";
import Utility from "~/app/services/Utility";

export default class PageService {
  static async getAsync(url: string, pageId: number): Promise<Page> {
    url = Utility.formatUrl(url, [pageId.toString()]);

    const validator = new PageSchemaValidator();
    return await Utility.getAsync<Page>(url, validator);
  }
}

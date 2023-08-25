import { Page } from "~/app/types/page";
import { PageResponse } from "~/app/types/responses/pageResponse";
import PageConverter from "~/app/types/converters/PageConverter";
import PageSchemaValidator from "~/app/services/validators/PageSchemaValidator";
import Utility from "~/app/services/Utility";

export default class PageService {
  static async getAsync(url: string, pageId: number): Promise<Page> {
    url = Utility.formatUrl(url, [pageId.toString()]);

    const validator = new PageSchemaValidator();
    const response = await Utility.getAsync<PageResponse>(url, validator);

    return PageConverter.convertResponseToPage(response);
  }
}

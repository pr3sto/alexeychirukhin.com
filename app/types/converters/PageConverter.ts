import { Page } from "~/app/types/page";
import { PageResponse } from "~/app/types/responses/pageResponse";

export default class PageConverter {
  static convertResponseToPage(response: PageResponse): Page {
    const page: Page = {
      id: response.id,
    };

    return page;
  }
}

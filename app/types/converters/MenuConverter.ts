import {
  Menu,
  MenuIndexSection,
  MenuPage,
  MenuSection,
} from "~/app/types/menu";
import {
  MenuIndexSectionResponse,
  MenuPageResponse,
  MenuResponse,
  MenuSectionResponse,
} from "~/app/types/responses/menuResponse";

export default class MenuConverter {
  static covertResponseToMenuPage(
    response: MenuPageResponse,
    route: string,
  ): MenuPage {
    const page: MenuPage = {
      id: response.id,
      path: response.path,
      displayName: response.displayName,
      route,
    };

    return page;
  }

  static convertResponseToIndexSection(
    response: MenuIndexSectionResponse,
  ): MenuIndexSection {
    const index: MenuIndexSection = {
      page: this.covertResponseToMenuPage(response.page, "/"),
    };

    return index;
  }

  static convertResponseToSection(response: MenuSectionResponse): MenuSection {
    const section: MenuSection = {
      path: response.path,
      displayName: response.displayName,
      pages: response.pages.map((page) =>
        this.covertResponseToMenuPage(page, `/${response.path}/${page.path}`),
      ),
    };

    return section;
  }

  static convertResponseToMenu(response: MenuResponse): Menu {
    const menu: Menu = {
      index: this.convertResponseToIndexSection(response.index),
      sections: response.sections.map((section) =>
        this.convertResponseToSection(section),
      ),
    };

    return menu;
  }
}

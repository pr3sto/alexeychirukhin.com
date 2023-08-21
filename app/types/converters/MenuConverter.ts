import { IndexSection, Menu, MenuPage, Section } from "../menu";
import {
  IndexSectionResponse,
  MenuPageResponse,
  MenuResponse,
  SectionResponse,
} from "./../responses/menuResponse";

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
    response: IndexSectionResponse,
  ): IndexSection {
    const index: IndexSection = {
      page: this.covertResponseToMenuPage(response.page, "/"),
    };

    return index;
  }

  static convertResponseToSection(response: SectionResponse): Section {
    const section: Section = {
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

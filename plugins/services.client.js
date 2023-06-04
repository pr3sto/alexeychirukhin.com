import Menu from "~/services/menu.js";
import Page from "~/services/page.js";
import Settings from "~/services/settings.js";
import Styles from "~/services/styles.js";

export default function ({ $api, store }, inject) {
  const menuService = Menu($api, store);
  const stylesService = Styles();
  const settingsService = Settings(store, stylesService);
  const pageService = Page($api, menuService, stylesService);

  const services = {
    menu: menuService,
    page: pageService,
    settings: settingsService,
    styles: stylesService,
  };

  inject("services", services);
}

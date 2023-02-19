import Menu from "~/services/menu.js";
import Page from "~/services/page.js";
import Settings from "~/services/settings.js";
import Styles from "~/services/styles.js";

export default ({ $api, store }, inject) => {
  const menuService = Menu($api, store);
  const settingsService = Settings(store);
  const stylesService = Styles();
  const pageService = Page($api, menuService, stylesService);

  const services = {
    menu: menuService,
    page: pageService,
    settings: settingsService,
    styles: stylesService,
  };

  inject("services", services);
};

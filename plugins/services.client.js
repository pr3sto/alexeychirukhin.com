import Menu from "~/services/menu.js";
import Page from "~/services/page.js";
import Settings from "~/services/settings.js";

export default ({ $api, store }, inject) => {
  const menuService = Menu($api, store);
  const pageService = Page($api, menuService);
  const settingsService = Settings(store);

  const services = {
    menu: menuService,
    page: pageService,
    settings: settingsService,
  };

  inject("services", services);
};

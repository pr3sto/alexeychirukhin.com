import AppState from "~/services/appstate.js";
import Menu from "~/services/menu.js";
import Page from "~/services/page.js";
import Settings from "~/services/settings.js";
import Styles from "~/services/styles.js";

export default function ({ $api, store }, inject) {
  const menuService = Menu($api, store);
  const pageService = Page($api);
  const appStateService = AppState(menuService, pageService);
  const stylesService = Styles();
  const settingsService = Settings(store, stylesService);

  const services = {
    menu: menuService,
    appState: appStateService,
    page: pageService,
    settings: settingsService,
    styles: stylesService,
  };

  inject("services", services);
}

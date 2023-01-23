import Menu from "~/api/menu.js";
import Page from "~/api/page.js";

export default (_, inject) => {
  const api = {
    menu: Menu,
    page: Page,
  };

  inject("api", api);
};
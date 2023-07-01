import Menu from "~/api/menu.js";
import Page from "~/api/page.js";

export default function ({ $globalProperties }, inject) {
  const api = {
    menu: Menu($globalProperties.menuApiUrl),
    page: Page($globalProperties.pageApiUrl),
  };

  inject("api", api);
}

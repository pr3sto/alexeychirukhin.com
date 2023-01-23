import Menu from "~/services/menu.js";
import Page from "~/services/page.js";

export default (context, inject) => {
  const menuService = Menu(context.$api, context.store);
  const pageService = Page(context.$api, menuService);

  const services = {
    menu: menuService,
    page: pageService,
  };

  inject("services", services);
};

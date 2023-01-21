import Page from "~/api/page";
import Menu from "~/api/menu";

export default (context, inject) => {
  const factories = {
    page: Page(context),
    menu: Menu(context),
  };

  inject("api", factories);
};

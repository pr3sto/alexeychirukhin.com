export default (api, store) => ({
  async loadToStoreAsync() {
    store.commit("menu/deleteData");

    const data = await api.menu.getAsync();

    if (!data || !isValid(data)) {
      console.log("MENU DATA INVALID");
      return;
    }

    // construct page routes
    data.index.page.route = "/";
    data.sections.forEach((section) => {
      section.pages.forEach((page) => {
        page.route = `/${section.path}/${page.path}`;
      });
    });

    store.commit("menu/setData", data);
  },
  get() {
    return store.state.menu;
  },
  getAllMenuPages() {
    const indexPage = store.state.menu.index.page;
    return store.state.menu.sections.reduce(
      (acc, section) => {
        return acc.concat(section.pages);
      },
      [indexPage]
    );
  },
  getMenuPageByRoute(route) {
    return this.getAllMenuPages().find((page) => page.route === route);
  },
  hasRoute(route) {
    return this.getAllMenuPages().some((page) => page.route === route);
  },
});

const menuSchema = {
  id: "/menu",
  type: "object",
  properties: {
    index: {
      type: "object",
      $ref: "/definitions/menu/index",
    },
    sections: {
      type: "array",
      items: { $ref: "/definitions/menu/section" },
    },
  },
  required: ["index", "sections"],
};

const menuIndexSchema = {
  id: "/definitions/menu/index",
  type: "object",
  properties: {
    page: {
      type: "object",
      properties: {
        id: { type: "number" },
        displayName: { type: "string" },
      },
      required: ["id", "displayName"],
    },
  },
  required: ["page"],
};

const menuSectionSchema = {
  id: "/definitions/menu/section",
  type: "object",
  properties: {
    path: { type: "string" },
    displayName: { type: "string" },
    pages: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "number" },
          path: { type: "string" },
          displayName: { type: "string" },
        },
        required: ["id", "path", "displayName"],
      },
    },
  },
  required: ["path", "displayName", "pages"],
};

function isValid(data) {
  const Validator = require("jsonschema").Validator;
  const validator = new Validator();

  validator.addSchema(menuIndexSchema, "/definitions/menu/index");
  validator.addSchema(menuSectionSchema, "/definitions/menu/section");

  const validateResult = validator.validate(data, menuSchema);

  console.log("MENU JSON VALIDATION", validateResult);

  return validateResult.valid;
}

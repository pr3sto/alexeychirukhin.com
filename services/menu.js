export default (api, vuexStore) => ({
  async loadToStoreAsync() {
    const data = await api.menu.getAsync();

    if (!data || !isValid(data)) {
      console.log("MENU DATA INVALID");
      vuexStore.commit("menu/deleteData");
      return;
    }

    // construct page routes
    data.index.page.route = "/";
    data.sections.forEach((section) => {
      section.pages.forEach((page) => {
        const sectionPath = section.path !== "" ? `/${section.path}` : "";
        page.route = `${sectionPath}/${page.path}`;
      });
    });

    vuexStore.commit("menu/setData", data);
  },
  get() {
    return vuexStore.state.menu;
  },
  getAllPages() {
    const indexPage = vuexStore.state.menu.index.page;
    return vuexStore.state.menu.sections.reduce(
      (acc, section) => {
        return acc.concat(section.pages);
      },
      [indexPage]
    );
  },
  getPageByRoute(route) {
    return this.getAllPages().find((page) => page.route === route);
  },
  isValidPageRoute(route) {
    return this.getAllPages().some((page) => page.route === route);
  },
});

const menuSchema = {
  id: "/menu",
  type: "object",
  properties: {
    index: {
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
    },
    sections: {
      type: "array",
      items: { $ref: "/definitions/menu/section" },
    },
  },
  required: ["index", "sections"],
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

  validator.addSchema(menuSectionSchema, "/definitions/menu/section");

  const validateResult = validator.validate(data, menuSchema);

  console.log("MENU JSON VALIDATION", validateResult);

  return validateResult.valid;
}

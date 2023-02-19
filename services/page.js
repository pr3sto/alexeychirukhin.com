let pagesCache = {};

export default (api, menuService, stylesService) => ({
  async loadAsync(route) {
    const menuPage = menuService.getMenuPageByRoute(route);

    // load page from api
    if (!pagesCache[menuPage.id]) {
      const pageData = await api.page.getAsync(menuPage.id);

      if (!pageData || !isDataValid(pageData)) {
        console.log("PAGE DATA INVALID");
        return null;
      }

      pagesCache[menuPage.id] = pageData;
    }

    // apply page styles
    stylesService.loadPageStyles(pagesCache[menuPage.id].settings);

    return pagesCache[menuPage.id];
  },
});

const pageSchema = {
  id: "/page",
  type: "object",
  properties: {
    id: { type: "number" },
    header: { type: "string" },
    settings: {
      type: "object",
      properties: {
        backgroundColor: { type: "string" },
        fontColor: { type: "string" },
        fontShadowColor: { type: "string" },
        fitScreen: { type: "boolean" },
      },
      required: ["backgroundColor", "fontColor", "fontShadowColor"],
    },
    components: {
      type: "array",
      items: {
        type: "object",
        properties: {
          content: {
            type: "object",
            oneOf: [
              { $ref: "/definitions/data/page/component/cardstack" },
              { $ref: "/definitions/data/page/component/photo" },
              { $ref: "/definitions/data/page/component/photogrid" },
              { $ref: "/definitions/data/page/component/textblocks" },
            ],
          },
          style: {
            type: "object",
            properties: {
              growToFitScreen: { type: "boolean" },
              padding: {
                type: "object",
                properties: {
                  top: { type: "boolean" },
                  bottom: { type: "boolean" },
                  left: { type: "boolean" },
                  right: { type: "boolean" },
                },
                required: ["top", "bottom", "left", "right"],
              },
              required: ["padding"],
            },
          },
        },
        required: ["content", "style"],
      },
    },
  },
  required: ["id", "header", "settings", "components"],
};

const cardstackComponentSchema = {
  id: "/definitions/data/page/component/cardstack",
  type: "object",
  properties: {
    type: { type: "string", enum: ["CardStack"] },
    cards: {
      type: "array",
      items: {
        oneOf: [
          {
            type: "object",
            properties: {
              type: { type: "string", enum: ["PhotoCard"] },
              round: { type: "boolean" },
              photoUrl: { type: "string" },
              caption: { type: "string" },
            },
            required: ["type", "round", "photoUrl"],
          },
          {
            type: "object",
            properties: {
              type: { type: "string", enum: ["DarkslideCard"] },
              html: { type: "string" },
            },
            required: ["type"],
          },
        ],
      },
    },
  },
  required: ["type", "cards"],
};

const photoComponentSchema = {
  id: "/definitions/data/page/component/photo",
  type: "object",
  properties: {
    type: { type: "string", enum: ["Photo"] },
    url: { type: "string" },
    caption: { type: "array", items: { type: "string" } },
  },
  required: ["type", "url"],
};

const photogridComponentSchema = {
  id: "/definitions/data/page/component/photogrid",
  type: "object",
  properties: {
    type: { type: "string", enum: ["PhotoGrid"] },
    cols: {
      type: "object",
      properties: {
        default: { type: "number" },
      },
      required: ["default"],
    },
    photos: {
      type: "array",
      items: {
        type: "object",
        properties: {
          url: { type: "string" },
          caption: { type: "array", items: { type: "string" } },
        },
        required: ["url"],
      },
    },
    padding: { type: "boolean" },
  },
  required: ["type", "photos"],
};

const textblocksComponentSchema = {
  id: "/definitions/data/page/component/textblocks",
  type: "object",
  properties: {
    type: { type: "string", enum: ["TextBlocks"] },
    blocks: {
      type: "array",
      items: {
        type: "object",
        properties: {
          align: { type: "string", enum: ["left", "right", "center"] },
          linesStyle: { type: "string" },
          lines: {
            type: "array",
            items: { type: "string" },
          },
        },
        required: ["align", "linesStyle", "lines"],
      },
    },
  },
  required: ["type", "blocks"],
};

function isDataValid(data) {
  const Validator = require("jsonschema").Validator;
  const validator = new Validator();

  validator.addSchema(
    cardstackComponentSchema,
    "/definitions/data/page/component/cardstack"
  );
  validator.addSchema(
    photoComponentSchema,
    "/definitions/data/page/component/photo"
  );
  validator.addSchema(
    photogridComponentSchema,
    "/definitions/data/page/component/photogrid"
  );
  validator.addSchema(
    textblocksComponentSchema,
    "/definitions/data/page/component/textblocks"
  );

  const validateResult = validator.validate(data, pageSchema);

  console.log("PAGE JSON VALIDATION", validateResult);

  return validateResult.valid;
}

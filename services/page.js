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
    stylesService.applyPageStyles(pagesCache[menuPage.id].style);

    return pagesCache[menuPage.id];
  },
});

const pageSchema = {
  id: "/page",
  type: "object",
  properties: {
    id: { type: "number", minimum: 0 },
    style: {
      type: "object",
      properties: {
        backgroundColor: { type: "string" },
        fontColor: { type: "string" },
        fitScreen: { type: "boolean" },
      },
      required: ["backgroundColor", "fontColor"],
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
              fillAvaliableSpace: { type: "boolean" },
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
            },
            required: ["padding"],
          },
        },
        required: ["content", "style"],
      },
    },
  },
  required: ["id", "style", "components"],
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
              photoUrl: { type: "string" },
              round: { type: "boolean" },
              caption: { type: "string" },
            },
            required: ["type", "photoUrl"],
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
    cardScale: { type: "number", minimum: 0, maximum: 0.99 },
    showBorder: { type: "boolean" },
  },
  required: ["type", "cards", "cardScale"],
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
        default: { type: "number", minimum: 1 },
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

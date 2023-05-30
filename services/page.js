import * as scssVars from "~/assets/scss/_variables.scss";

let pagesCache = {};

export default (api, menuService, stylesService) => ({
  async loadAsync(route) {
    const { id } = menuService.getMenuPageByRoute(route);

    // load page from api
    if (!pagesCache[id]) {
      const pageData = await api.page.getAsync(id);

      if (!pageData || !isDataValid(pageData)) {
        throw Error("PAGE DATA INVALID");
      }

      pageData.components
        .filter(
          (component) =>
            component.content.type === "PhotoGrid" && component.content.cols
        )
        .forEach((component) => {
          // transform PhotoGrid cols to masonry component structure
          const cols = component.content.cols;
          const smMaxWidth = scssVars.mediaMobileMaxWidth.slice(0, -2);
          component.content.cols = {
            default: cols.lg,
            [smMaxWidth]: cols.sm,
          };
        });

      pagesCache[id] = pageData;
    }

    // apply page styles
    stylesService.applyPageStyles(pagesCache[id].styles);

    return pagesCache[id];
  },
});

const cssSizeRegex = "^(([0-9]*[.])?[0-9]+)(px|em|rem|vh)?$";

const pageSchema = {
  id: "/page",
  type: "object",
  properties: {
    id: { type: "number", minimum: 0 },
    styles: {
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
          styles: {
            type: "object",
            properties: {
              fillAvaliableSpace: { type: "boolean" },
              fadeInTransition: {
                type: "object",
                properties: {
                  triggerOffsetPercentage: {
                    type: "number",
                    minimum: 0,
                  },
                },
                required: ["triggerOffsetPercentage"],
              },
              offset: {
                type: "object",
                properties: {
                  top: { type: "string", pattern: cssSizeRegex },
                  bottom: { type: "string", pattern: cssSizeRegex },
                  left: { type: "string", pattern: cssSizeRegex },
                  right: { type: "string", pattern: cssSizeRegex },
                },
                required: ["top", "bottom", "left", "right"],
              },
            },
            required: ["offset"],
          },
        },
        required: ["content", "styles"],
      },
    },
  },
  required: ["id", "styles", "components"],
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
            required: ["type", "html"],
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
    caption: {
      type: "object",
      properties: {
        linesStyle: { type: "string" },
        lines: {
          type: "array",
          items: { type: "string" },
        },
      },
      required: ["linesStyle", "lines"],
    },
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
        lg: { type: "number", minimum: 1 },
        sm: { type: "number", minimum: 1 },
      },
      required: ["lg", "sm"],
    },
    photos: {
      type: "array",
      items: {
        type: "object",
        properties: {
          url: { type: "string" },
          caption: {
            type: "object",
            properties: {
              linesStyle: { type: "string" },
              lines: {
                type: "array",
                items: { type: "string" },
              },
            },
            required: ["linesStyle", "lines"],
          },
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

import * as scssVars from "~/assets/scss/_variables.scss";
import lodash from "lodash";

let pagesCache = {};

export default (api) => ({
  async getPageAsync(id) {
    if (pagesCache[id] && pagesCache[id].data) {
      return pagesCache[id].data;
    }

    const pageData = await api.page.getAsync(id);

    if (!pageData || !isDataValid(pageData)) {
      throw Error("PAGE DATA INVALID");
    }

    // transform PhotoGrid cols to masonry component structure
    pageData.components
      .filter((component) => component.content.type === "PhotoGrid")
      .flatMap((component) => component.content.sections)
      .forEach((section) => {
        const cols = section.cols;
        const smMaxWidth = scssVars.mediaMobileMaxWidth.slice(0, -2);
        section.cols = {
          default: cols.lg,
          [smMaxWidth]: cols.sm,
        };
      });

    // parse data to retrieve all photos on a page
    const pagePhotos = this._getPagePhotos(pageData);

    pagesCache[id] = { data: pageData, photos: pagePhotos };
    return pageData;
  },
  getPagePhotos(id) {
    if (pagesCache[id] && pagesCache[id].photos) {
      return pagesCache[id].photos;
    }
    return [];
  },
  _getPagePhotos(pageData) {
    let photos = [];
    pageData.components.forEach((component) => {
      if (component.content.type === "PhotoGrid") {
        const photoGridPhotos = component.content.sections.flatMap(
          (section) => section.photos
        );
        photos = lodash.union(photos, photoGridPhotos);
      } else if (component.content.type === "Photo") {
        photos.push(component.content);
      }
    });
    return photos;
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
        $ref: "/definitions/data/page/component",
      },
    },
  },
  required: ["id", "styles", "components"],
};

const componentSchema = {
  id: "/definitions/data/page/component",
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
        maxHeight: { type: "string", pattern: cssSizeRegex },
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
};

const cardstackComponentSchema = {
  id: "/definitions/data/page/component/cardstack",
  type: "object",
  properties: {
    type: { type: "string", enum: ["CardStack"] },
    cardScale: { type: "number", minimum: 0, maximum: 0.99 },
    showBorder: { type: "boolean" },
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
  },
  required: ["type", "cardScale", "cards"],
};

const photoComponentSchema = {
  id: "/definitions/data/page/component/photo",
  type: "object",
  properties: {
    type: { type: "string", enum: ["Photo"] },
    url: { type: "string" },
    width: { type: "number", minimum: 1 },
    height: { type: "number", minimum: 1 },
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
  required: ["type", "url", "width", "height"],
};

const photogridComponentSchema = {
  id: "/definitions/data/page/component/photogrid",
  type: "object",
  properties: {
    type: { type: "string", enum: ["PhotoGrid"] },
    padding: { type: "boolean" },
    sections: {
      type: "array",
      items: {
        type: "object",
        properties: {
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
                width: { type: "number", minimum: 1 },
                height: { type: "number", minimum: 1 },
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
              required: ["url", "width", "height"],
            },
          },
        },
        required: ["cols", "photos"],
      },
    },
  },
  required: ["type", "padding", "sections"],
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

  validator.addSchema(componentSchema, "/definitions/data/page/component");
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

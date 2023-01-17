export const actions = {
  async nuxtClientInit({ commit }, context) {
    // cache data in local storage for [LOCAL_STORE_LIFETIME_MINUTES] minutes
    if (context.store.state.data.timestamp) {
      const milliseconds = Date.now() - context.store.state.data.timestamp;
      const minutes = Math.floor(milliseconds / 1000 / 60);
      if (minutes < process.env.LOCAL_STORE_LIFETIME_MINUTES) {
        return;
      }
    }

    // get JSON data
    const data = await requestDataAsync(process.env.DATA_JSON_PATH);

    // validate data
    if (isValid(data)) {
      commit("data/setData", data);
    } else {
      console.log("JSON DATA VALIDATION ERROR");
    }
  },
};

async function requestDataAsync(path) {
  const headers = new Headers();
  headers.append("pragma", "no-cache");
  headers.append("cache-control", "no-cache");

  const data = await fetch(new URL(path, window.location.origin), {
    method: "GET",
    headers: headers,
  }).then((res) => res.json());

  return data;
}

const dataSchema = {
  id: "/data",
  type: "object",
  properties: {
    pages: {
      type: "array",
      items: { $ref: "/definitions/data/page" },
    },
    misc: { $ref: "/definitions/data/misc" },
  },
  required: ["pages", "misc"],
};

const dataPageSchema = {
  id: "/definitions/data/page",
  type: "object",
  properties: {
    header: { type: "string" },
    section: { type: "string" },
    path: { type: "string" },
    components: {
      type: "array",
      items: {
        type: "object",
        properties: {
          content: {
            type: "object",
            oneOf: [
              { $ref: "/definitions/data/page/component/cardstack" },
              { $ref: "/definitions/data/page/component/photogrid" },
              { $ref: "/definitions/data/page/component/textblocks" },
            ],
          },
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
        required: ["content", "padding"],
      },
    },
  },
  required: ["header", "components"],
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

const dataMiscSchema = {
  id: "/definitions/data/misc",
  type: "object",
  properties: {
    noImageUrl: { type: "string" },
  },
  required: ["noImageUrl"],
};

function isValid(data) {
  const Validator = require("jsonschema").Validator;
  const validator = new Validator();

  validator.addSchema(
    cardstackComponentSchema,
    "/definitions/data/page/component/cardstack"
  );
  validator.addSchema(
    photogridComponentSchema,
    "/definitions/data/page/component/photogrid"
  );
  validator.addSchema(
    textblocksComponentSchema,
    "/definitions/data/page/component/textblocks"
  );
  validator.addSchema(dataPageSchema, "/definitions/data/page");
  validator.addSchema(dataMiscSchema, "/definitions/data/misc");

  const validateResult = validator.validate(data, dataSchema);

  console.log(validateResult);

  return validateResult.valid;
}

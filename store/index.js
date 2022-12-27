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
    } else if (process.env.NODE_ENV !== "production") {
      alert("JSON DATA VALIDATION ERROR");
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
    content: {
      type: "object",
      properties: {
        blocks: {
          type: "array",
          items: {
            oneOf: [
              { $ref: "/definitions/data/page/content/cardstack" },
              { $ref: "/definitions/data/page/content/photogrid" },
            ],
          },
        },
      },
      required: ["blocks"],
    },
  },
  required: ["header", "content"],
};

const cardstackContentSchema = {
  id: "/definitions/data/page/content/cardstack",
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

const photogridContentSchema = {
  id: "/definitions/data/page/content/photogrid",
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
        },
        required: ["url"],
      },
    },
  },
  required: ["type", "photos"],
};

const textContentSchema = {
  id: "/definitions/data/page/content/text",
  type: "object",
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
    cardstackContentSchema,
    "/definitions/data/page/content/cardstack"
  );
  validator.addSchema(
    photogridContentSchema,
    "/definitions/data/page/content/photogrid"
  );
  validator.addSchema(textContentSchema, "/definitions/data/page/content/text");
  validator.addSchema(dataPageSchema, "/definitions/data/page");
  validator.addSchema(dataMiscSchema, "/definitions/data/misc");

  return validator.validate(data, dataSchema).valid;
}

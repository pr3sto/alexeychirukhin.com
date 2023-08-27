import { JSONSchemaType } from "ajv";
import CommonSchemaValidator from "./CommonSchemaValidator";
import * as MenuTypes from "~/app/types/menu";

const menuPageSchema: JSONSchemaType<MenuTypes.MenuPage> = {
  type: "object",
  properties: {
    id: { type: "number", minimum: 0 },
    path: { type: "string" },
    displayName: { type: "string" },
  },
  required: ["id", "path", "displayName"],
  additionalProperties: false,
};

const indexSchema: JSONSchemaType<MenuTypes.MenuIndexSection> = {
  type: "object",
  properties: {
    page: menuPageSchema,
  },
  required: ["page"],
  additionalProperties: false,
};

const sectionSchema: JSONSchemaType<MenuTypes.MenuSection> = {
  type: "object",
  properties: {
    path: { type: "string" },
    displayName: { type: "string" },
    pages: {
      type: "array",
      items: menuPageSchema,
    },
  },
  required: ["path", "displayName", "pages"],
  additionalProperties: false,
};

const menuSchema: JSONSchemaType<MenuTypes.Menu> = {
  type: "object",
  properties: {
    index: indexSchema,
    sections: {
      type: "array",
      items: sectionSchema,
    },
  },
  required: ["index", "sections"],
  additionalProperties: false,
};

export default class MenuSchemaValidator extends CommonSchemaValidator {
  constructor() {
    super(menuSchema);
  }
}

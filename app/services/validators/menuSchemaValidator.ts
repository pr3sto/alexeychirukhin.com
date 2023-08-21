import { JSONSchemaType } from "ajv";
import CommonSchemaValidator from "./commonSchemaValidator";
import {
  IndexSectionResponse,
  MenuPageResponse,
  MenuResponse,
  SectionResponse,
} from "app/types/responses/menuResponse";

const menuPageSchema: JSONSchemaType<MenuPageResponse> = {
  type: "object",
  properties: {
    id: { type: "number", minimum: 0 },
    path: { type: "string" },
    displayName: { type: "string" },
  },
  required: ["id", "path", "displayName"],
  additionalProperties: false,
};

const indexSchema: JSONSchemaType<IndexSectionResponse> = {
  type: "object",
  properties: {
    page: menuPageSchema,
  },
  required: ["page"],
  additionalProperties: false,
};

const sectionSchema: JSONSchemaType<SectionResponse> = {
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

const menuSchema: JSONSchemaType<MenuResponse> = {
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

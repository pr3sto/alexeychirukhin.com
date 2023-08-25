import { JSONSchemaType } from "ajv";
import CommonSchemaValidator from "./CommonSchemaValidator";
import { PageResponse } from "~/app/types/responses/pageResponse";

const pageSchema: JSONSchemaType<PageResponse> = {
  type: "object",
  properties: {
    id: { type: "number" },
  },
  required: ["id"],
  additionalProperties: true,
};

export default class PageSchemaValidator extends CommonSchemaValidator {
  constructor() {
    super(pageSchema);
  }
}

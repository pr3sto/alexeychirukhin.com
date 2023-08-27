import { JSONSchemaType } from "ajv";
import CommonSchemaValidator from "./CommonSchemaValidator";
import * as PageTypes from "~/app/types/page";

const cssSizeRegex = "^(([0-9]*[.])?[0-9]+)(px|em|rem|vh)?$";

const photoCardSchema: JSONSchemaType<PageTypes.PhotoCard> = {
  type: "object",
  properties: {
    type: { type: "string", enum: ["PhotoCard"] },
    photoUrl: { type: "string" },
    round: { type: "boolean" },
    caption: { type: "string", nullable: true },
  },
  required: ["type", "photoUrl", "round"],
  additionalProperties: false,
};

const darkslideCardSchema: JSONSchemaType<PageTypes.DarkslideCard> = {
  type: "object",
  properties: {
    type: { type: "string", enum: ["DarkslideCard"] },
    html: { type: "string" },
  },
  required: ["type", "html"],
  additionalProperties: false,
};

const cardStackSchema: JSONSchemaType<PageTypes.CardStack> = {
  type: "object",
  properties: {
    type: { type: "string", enum: ["CardStack"] },
    cardScale: { type: "number", minimum: 0, maximum: 0.99 },
    showBorder: { type: "boolean" },
    cards: {
      type: "array",
      items: { oneOf: [photoCardSchema, darkslideCardSchema] },
    },
  },
  required: ["type", "cardScale", "showBorder", "cards"],
  additionalProperties: false,
};

const photoSchema: JSONSchemaType<PageTypes.Photo> = {
  type: "object",
  properties: {
    type: { type: "string", enum: ["Photo"] },
    url: { type: "string" },
    width: { type: "number", minimum: 1 },
    height: { type: "number", minimum: 1 },
  },
  required: ["type", "url", "width", "height"],
  additionalProperties: false,
};

const photoGridSectionColsSchema: JSONSchemaType<PageTypes.PhotoGridSectionCols> =
  {
    type: "object",
    properties: {
      lg: { type: "number", minimum: 1 },
      sm: { type: "number", minimum: 1 },
    },
    required: ["lg", "sm"],
    additionalProperties: false,
  };

const photoGridSectionSchema: JSONSchemaType<PageTypes.PhotoGridSection> = {
  type: "object",
  properties: {
    cols: photoGridSectionColsSchema,
    photos: { type: "array", items: photoSchema },
  },
  required: ["cols", "photos"],
  additionalProperties: false,
};

const photoGridSchema: JSONSchemaType<PageTypes.PhotoGrid> = {
  type: "object",
  properties: {
    type: { type: "string", enum: ["PhotoGrid"] },
    padding: { type: "boolean" },
    sections: { type: "array", items: photoGridSectionSchema },
  },
  required: ["type", "padding", "sections"],
  additionalProperties: false,
};

const textBlockSchema: JSONSchemaType<PageTypes.TextBlock> = {
  type: "object",
  properties: {
    align: { type: "string" },
    linesStyle: { type: "string" },
    lines: { type: "array", items: { type: "string" } },
  },
  required: ["align", "linesStyle", "lines"],
  additionalProperties: false,
};

const textBlocksSchema: JSONSchemaType<PageTypes.TextBlocks> = {
  type: "object",
  properties: {
    type: { type: "string", enum: ["TextBlocks"] },
    blocks: { type: "array", items: textBlockSchema },
  },
  required: ["type", "blocks"],
  additionalProperties: false,
};

const fadeInTransitionSchema: JSONSchemaType<PageTypes.FadeInTransition> = {
  type: "object",
  properties: {
    triggerOffsetPercentage: { type: "number" },
  },
  required: ["triggerOffsetPercentage"],
  additionalProperties: false,
};

const offsetSchema: JSONSchemaType<PageTypes.Offset> = {
  type: "object",
  properties: {
    top: { type: "string", pattern: cssSizeRegex },
    bottom: { type: "string", pattern: cssSizeRegex },
    left: { type: "string", pattern: cssSizeRegex },
    right: { type: "string", pattern: cssSizeRegex },
  },
  required: ["top", "bottom", "left", "right"],
  additionalProperties: false,
};

const pageComponentStylesSchema: JSONSchemaType<PageTypes.PageComponentStyles> =
  {
    type: "object",
    properties: {
      fadeInTransition: { ...fadeInTransitionSchema, nullable: true },
      maxHeight: { type: "string", pattern: cssSizeRegex, nullable: true },
      offset: offsetSchema,
    },
    required: ["offset"],
    additionalProperties: false,
  };

const pageStylesSchema: JSONSchemaType<PageTypes.PageStyles> = {
  type: "object",
  properties: {
    backgroundColor: { type: "string" },
    fontColor: { type: "string" },
  },
  required: ["backgroundColor", "fontColor"],
  additionalProperties: false,
};

const pageComponentSchema: JSONSchemaType<PageTypes.PageComponent> = {
  type: "object",
  properties: {
    content: {
      oneOf: [cardStackSchema, photoSchema, photoGridSchema, textBlocksSchema],
    },
    styles: pageComponentStylesSchema,
  },
  required: ["content", "styles"],
  additionalProperties: false,
};

const pageSchema: JSONSchemaType<PageTypes.Page> = {
  type: "object",
  properties: {
    id: { type: "number", minimum: 0 },
    styles: pageStylesSchema,
    components: { type: "array", items: pageComponentSchema },
  },
  required: ["id", "styles", "components"],
  additionalProperties: false,
};

export default class PageSchemaValidator extends CommonSchemaValidator {
  constructor() {
    super(pageSchema);
  }
}

import Ajv, { Schema } from "ajv";
import IValidator from "./validator";

export default abstract class CommonSchemaValidator implements IValidator {
  schema: Schema;

  constructor(schema: Schema) {
    this.schema = schema;
  }

  validate(json: string): void {
    const ajv = new Ajv();
    const validate = ajv.compile(this.schema);

    const isValid = validate(json);

    if (!isValid) {
      throw new Error(JSON.stringify(validate.errors));
    }
  }
}

import ISchemaValidator from "~/app/services/validators/ISchemaValidator";

export default class Utility {
  static async getAsync<TResponse>(
    url: string,
    validator?: ISchemaValidator,
  ): Promise<TResponse> {
    const response = await fetch(new URL(url, window.location.origin), {
      method: "GET",
    });

    const jsonData = await response.json();

    // validate json schema
    validator?.validate(jsonData);

    return jsonData as TResponse;
  }
}

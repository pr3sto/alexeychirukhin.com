import utility from "~/api/utility.js";

export default (baseUrl) => ({
  async getAsync() {
    return await utility.getAsync(baseUrl);
  },
});

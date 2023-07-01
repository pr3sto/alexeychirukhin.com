import utility from "~/api/utility.js";

export default (apiUrl) => ({
  async getAsync() {
    return await utility.getAsync(apiUrl);
  },
});

import utility from "~/api/utility.js";

export default (baseUrl) => ({
  async getAsync(id) {
    return await utility.getAsync(format(baseUrl, [id]));
  },
});

function format(str, args) {
  return str.replace(/{(\d+)}/g, (match, number) => {
    return typeof args[number] != "undefined" ? args[number] : match;
  });
}

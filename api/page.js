import utility from "~/api/utility.js";

export default (apiUrl) => ({
  async getAsync(id) {
    return await utility.getAsync(format(apiUrl, [id]));
  },
});

function format(str, args) {
  return str.replace(/{(\d+)}/g, (match, number) => {
    return typeof args[number] != "undefined" ? args[number] : match;
  });
}

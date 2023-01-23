import utility from "~/api/utility.js";
import app from "~/constants/app.js";

export default {
  async getAsync(id) {
    return await utility.getAsync(format(app.PAGE_API_URL, [id]));
  },
};

function format(str, args) {
  return str.replace(/{(\d+)}/g, function (match, number) {
    return typeof args[number] != "undefined" ? args[number] : match;
  });
}

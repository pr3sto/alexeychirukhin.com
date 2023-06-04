import api from "~/constants/api.js";
import utility from "~/api/utility.js";

export default {
  async getAsync(id) {
    return await utility.getAsync(format(api.PAGE_API_URL, [id]));
  },
};

function format(str, args) {
  return str.replace(/{(\d+)}/g, (match, number) => {
    return typeof args[number] != "undefined" ? args[number] : match;
  });
}

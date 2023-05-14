import utility from "~/api/utility.js";
import api from "~/constants/api.js";

export default {
  async getAsync() {
    return await utility.getAsync(api.MENU_API_URL);
  },
};

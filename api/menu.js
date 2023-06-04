import api from "~/constants/api.js";
import utility from "~/api/utility.js";

export default {
  async getAsync() {
    return await utility.getAsync(api.MENU_API_URL);
  },
};

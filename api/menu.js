import utility from "~/api/utility.js";
import app from "~/constants/app.js";

export default {
  async getAsync() {
    return await utility.getAsync(app.MENU_API_URL);
  },
};

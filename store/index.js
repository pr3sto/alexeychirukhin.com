export const actions = {
  async nuxtClientInit(_, context) {
    await context.$services.menu.loadToStoreAsync();
  },
};

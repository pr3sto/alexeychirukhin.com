export const actions = {
  async nuxtClientInit(_, { $services }) {
    // load menu
    await $services.menu.loadToStoreAsync();

    // initialize app settings
    await $services.settings.init();
  },
};

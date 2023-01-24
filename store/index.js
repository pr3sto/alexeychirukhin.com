export const actions = {
  async nuxtClientInit(_, { $services }) {
    // load menu before on app init
    await $services.menu.loadToStoreAsync();

    // settings are stored in persisted storage
    // and some old values may become invalid
    // so should fix state if necessary
    await $services.settings.fixState();
  },
};

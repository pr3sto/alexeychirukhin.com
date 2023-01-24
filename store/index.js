export const actions = {
  async nuxtClientInit(_, { $services }) {
    await $services.menu.loadToStoreAsync();
  },
};

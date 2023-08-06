export const actions = {
  async nuxtClientInit(_, { $services }) {
    // initialize navigation
    await $services.navigation.initializeAsync();

    // initialize app settings
    $services.settings.initialize();
  },
};

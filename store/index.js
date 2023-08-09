export const actions = {
  async nuxtClientInit(_, { $services }) {
    // initialize app state
    await $services.appState.initializeAsync();

    // initialize app settings
    $services.settings.validate();
  },
};

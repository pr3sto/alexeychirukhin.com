export const actions = {
  async nuxtClientInit(_, { $services }) {
    // initialize app state
    await $services.appState.initializeAsync();

    // validate settings saved in local storage
    $services.settings.validate();
  },
};

import * as scssVars from "~/assets/scss/_variables.scss";

export default (store, stylesService) => ({
  initialize() {
    store.commit("settings/validate");
    updateCssRootVariables(store, stylesService);
  },
  getUseMobileVersion() {
    return store.state.settings.useMobileVersion;
  },
  setUseMobileVersion(useMobileVersion) {
    return store.commit("settings/setUseMobileVersion", useMobileVersion);
  },
  photo: {
    get() {
      return store.state.settings.photo;
    },
    setWhiteFullscreenBgColor() {
      store.commit("settings/setPhotoFullscreenBgColor", scssVars.whiteColor);
      updateCssRootVariables(store, stylesService);
    },
    setBlackFullscreenBgColor() {
      store.commit("settings/setPhotoFullscreenBgColor", scssVars.blackColor);
      updateCssRootVariables(store, stylesService);
    },
  },
});

function updateCssRootVariables(store, stylesService) {
  stylesService.setRootVariable(
    scssVars.varPhotoFsBgColor,
    store.state.settings.photo.fullscreenBgColor
  );
}

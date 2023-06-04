import * as scssVars from "~/assets/scss/_variables.scss";

export default (store, stylesService) => ({
  init() {
    store.commit("settings/validate");
    updateCssVars(store, stylesService);
  },
  getUseMobileVersion() {
    return store.state.settings.useMobileVersion;
  },
  setUseMobileVersion(useMobileVersion) {
    return store.commit("settings/setUseMobileVersion", useMobileVersion);
  },
  photoGrid: {
    get() {
      return store.state.settings.photoGrid;
    },
    setWhiteFullscreenBgColor() {
      store.commit("settings/setPhotoFullscreenBgColor", scssVars.whiteColor);
      updateCssVars(store, stylesService);
    },
    setBlackFullscreenBgColor() {
      store.commit("settings/setPhotoFullscreenBgColor", scssVars.blackColor);
      updateCssVars(store, stylesService);
    },
  },
});

function updateCssVars(store, stylesService) {
  stylesService.setRootVariable(
    "--photo-fs-bg-color",
    store.state.settings.photoGrid.fullscreenBgColor
  );
}

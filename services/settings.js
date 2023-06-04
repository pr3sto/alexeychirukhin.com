import * as scssVars from "~/assets/scss/_variables.scss";

export default (store) => ({
  validate() {
    store.commit("settings/validate");
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
    },
    setBlackFullscreenBgColor() {
      store.commit("settings/setPhotoFullscreenBgColor", scssVars.blackColor);
    },
  },
});

import * as scssVars from "~/assets/scss/_variables.scss";

export default (store) => ({
  fixState() {
    store.commit("settings/fixState");
  },
  useMobileVersion() {
    return store.state.settings.useMobileVersion;
  },
  viewportHeight() {
    return store.state.settings.viewportHeight;
  },
  setUseMobileVersion(useMobileVersion) {
    return store.commit("settings/setUseMobileVersion", useMobileVersion);
  },
  setViewportHeight(viewportHeight) {
    return store.commit("settings/setViewportHeight", viewportHeight);
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
    switchFullscreenBgTransparency() {
      store.commit(
        "settings/setPhotoFullscreenBgTransparency",
        !store.state.settings.photoGrid.fullscreenBgTransparent
      );
    },
  },
});

import * as scssVars from "~/assets/scss/_variables.scss";

export default (store) => ({
  isSmallScreen() {
    return store.state.settings.isSmallScreen;
  },
  setIsSmallScreen(isSmallScreen) {
    return store.commit("settings/setIsSmallScreen", isSmallScreen);
  },
  photogrid: {
    get() {
      return store.state.settings.photogrid;
    },
    setWhiteFullscreenBgColor() {
      store.commit(
        "settings/setPhotogridFullscreenBgColor",
        scssVars.whiteColor
      );
    },
    setBlackFullscreenBgColor() {
      store.commit(
        "settings/setPhotogridFullscreenBgColor",
        scssVars.blackColor
      );
    },
    switchFullscreenBgTransparency() {
      store.commit(
        "settings/setPhotogridFullscreenBgTransparency",
        !store.state.settings.photogrid.fullscreenBgTransparent
      );
    },
  },
});

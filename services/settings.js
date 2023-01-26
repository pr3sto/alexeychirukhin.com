import * as scssVars from "~/assets/scss/_variables.scss";

export default (store) => ({
  fixState() {
    store.commit("settings/fixState");
  },
  isSmallScreen() {
    return store.state.settings.isSmallScreen;
  },
  setIsSmallScreen(isSmallScreen) {
    return store.commit("settings/setIsSmallScreen", isSmallScreen);
  },
  photo: {
    get() {
      return store.state.settings.photo;
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
        !store.state.settings.photo.fullscreenBgTransparent
      );
    },
  },
});

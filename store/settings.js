import * as scssVars from "~/assets/scss/_variables.scss";

const defaultState = {
  isSmallScreen: false,
  photo: {
    fullscreenBgColor: scssVars.whiteColor,
    fullscreenBgTransparent: true,
  },
};

export const state = () => defaultState;

export const mutations = {
  setIsSmallScreen(state, value) {
    state.isSmallScreen = value;
  },
  setPhotoFullscreenBgColor(state, value) {
    state.photo.fullscreenBgColor = value;
  },
  setPhotoFullscreenBgTransparency(state, value) {
    state.photo.fullscreenBgTransparent = value;
  },
  fixState(state) {
    if (
      state.photo.fullscreenBgColor !== scssVars.whiteColor &&
      state.photo.fullscreenBgColor !== scssVars.blackColor
    ) {
      state.photo.fullscreenBgColor = defaultState.photo.fullscreenBgColor;
    }
    if (
      state.photo.fullscreenBgTransparent !== true &&
      state.photo.fullscreenBgTransparent !== false
    ) {
      state.photo.fullscreenBgTransparent =
        defaultState.photo.fullscreenBgTransparent;
    }
  },
};

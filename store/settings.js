import * as scssVars from "~/assets/scss/_variables.scss";

const defaultState = {
  isSmallScreen: false,
  photoGrid: {
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
    state.photoGrid.fullscreenBgColor = value;
  },
  setPhotoFullscreenBgTransparency(state, value) {
    state.photoGrid.fullscreenBgTransparent = value;
  },
  fixState(state) {
    if (
      state.photoGrid.fullscreenBgColor !== scssVars.whiteColor &&
      state.photoGrid.fullscreenBgColor !== scssVars.blackColor
    ) {
      state.photoGrid.fullscreenBgColor =
        defaultState.photoGrid.fullscreenBgColor;
    }
    if (
      state.photoGrid.fullscreenBgTransparent !== true &&
      state.photoGrid.fullscreenBgTransparent !== false
    ) {
      state.photoGrid.fullscreenBgTransparent =
        defaultState.photoGrid.fullscreenBgTransparent;
    }
  },
};

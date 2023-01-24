import * as scssVars from "~/assets/scss/_variables.scss";

const defaultState = {
  isSmallScreen: false,
  photogrid: {
    fullscreenBgColor: scssVars.whiteColor,
    fullscreenBgTransparent: true,
  },
};

export const state = () => defaultState;

export const mutations = {
  setIsSmallScreen(state, value) {
    state.isSmallScreen = value;
  },
  setPhotogridFullscreenBgColor(state, value) {
    state.photogrid.fullscreenBgColor = value;
  },
  setPhotogridFullscreenBgTransparency(state, value) {
    state.photogrid.fullscreenBgTransparent = value;
  },
  fixState(state) {
    if (state.isSmallScreen !== true && state.isSmallScreen !== false) {
      state.isSmallScreen = defaultState.isSmallScreen;
    }
    if (
      state.photogrid.fullscreenBgColor !== scssVars.whiteColor &&
      state.photogrid.fullscreenBgColor !== scssVars.blackColor
    ) {
      state.photogrid.fullscreenBgColor =
        defaultState.photogrid.fullscreenBgColor;
    }
    if (
      state.photogrid.fullscreenBgTransparent !== true &&
      state.photogrid.fullscreenBgTransparent !== false
    ) {
      state.photogrid.fullscreenBgTransparent =
        defaultState.photogrid.fullscreenBgTransparent;
    }
  },
};

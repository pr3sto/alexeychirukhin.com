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
};

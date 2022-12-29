const defaultState = {
  isSmallScreen: false,
  photogrid: {
    fullscreenBgColor: "1f1f1f",
    fullscreenBgTransparency: "e6",
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
    state.photogrid.fullscreenBgTransparency = value;
  },
};

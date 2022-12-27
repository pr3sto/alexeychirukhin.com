const defaultState = {
  isSmallScreen: false,
  photogrid: {
    fullscreenBgColor: "0,0,0",
    fullscreenBgTransparency: 0.9,
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

import * as scssVars from "~/assets/scss/_variables.scss";

const defaultState = {
  useMobileVersion: false,
  viewportHeight: 0,
  photoGrid: {
    fullscreenBgColor: scssVars.whiteColor,
  },
};

export const state = () => defaultState;

export const mutations = {
  setUseMobileVersion(state, value) {
    state.useMobileVersion = value;
  },
  setViewportHeight(state, value) {
    state.viewportHeight = value;
  },
  setPhotoFullscreenBgColor(state, value) {
    state.photoGrid.fullscreenBgColor = value;
  },
  validate(state) {
    if (
      state.photoGrid.fullscreenBgColor !== scssVars.whiteColor &&
      state.photoGrid.fullscreenBgColor !== scssVars.blackColor
    ) {
      state.photoGrid.fullscreenBgColor =
        defaultState.photoGrid.fullscreenBgColor;
    }
  },
};

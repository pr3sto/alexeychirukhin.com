import * as scssVars from "~/assets/scss/_variables.scss";

const defaultState = {
  useMobileVersion: false,
  photo: {
    fullscreenBgColor: scssVars.whiteColor,
  },
};

export const state = () => defaultState;

export const mutations = {
  setUseMobileVersion(state, value) {
    state.useMobileVersion = value;
  },
  setPhotoFullscreenBgColor(state, value) {
    state.photo.fullscreenBgColor = value;
  },
  validate(state) {
    if (
      state.photo.fullscreenBgColor !== scssVars.whiteColor &&
      state.photo.fullscreenBgColor !== scssVars.blackColor
    ) {
      state.photo.fullscreenBgColor = defaultState.photo.fullscreenBgColor;
    }
  },
};

const defaultState = {
  index: {},
  sections: [],
};

export const state = () => defaultState;

export const mutations = {
  setData(state, data) {
    state.index = data.index;
    state.sections = data.sections;
  },
  resetData(state) {
    Object.assign(state, defaultState);
  },
};

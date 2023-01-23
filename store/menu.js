const defaultState = {
  index: {},
  sections: [],
};

export const state = () => defaultState;

export const mutations = {
  setData(state, data) {
    Object.assign(state, defaultState);

    state.index = data.index;
    state.sections = data.sections;
  },
  deleteData(state) {
    Object.assign(state, defaultState);
  },
};

import createPersistedState from "vuex-persistedstate";

export default function ({ store }) {
  createPersistedState()(store);
}

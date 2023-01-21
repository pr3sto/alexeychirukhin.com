export default (context) => ({
  get() {
    return context.store.state.data.menu;
  },
});

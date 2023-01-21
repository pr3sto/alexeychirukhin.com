export default (context) => ({
  get(route) {
    return context.store.state.data.pages.find((page) => page.route === route);
  },
  noImageUrl() {
    return context.store.state.data.misc.noImageUrl;
  },
});

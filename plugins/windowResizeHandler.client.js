export default ({ store }) => {
  detectScreenSize(store);
  window.onresize = () => {
    detectScreenSize(store);
  };
};

function detectScreenSize(store) {
  const storedValue = store.state.settings.isSmallScreen;
  const isSmallScreen = window.matchMedia("(max-width: 700px)").matches;

  if (storedValue !== isSmallScreen) {
    store.commit("settings/setIsSmallScreen", isSmallScreen);
  }
}

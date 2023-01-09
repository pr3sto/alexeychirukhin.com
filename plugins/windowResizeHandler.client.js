import * as scssVars from "~/assets/scss/_variables.scss";

export default ({ store }) => {
  detectScreenSize(store);
  window.onresize = () => {
    detectScreenSize(store);
  };
};

function detectScreenSize(store) {
  const storedValue = store.state.settings.isSmallScreen;
  const isSmallScreen = window.matchMedia(
    `(max-width: ${scssVars.mediaMobileMaxWidth})`
  ).matches;

  if (storedValue !== isSmallScreen) {
    store.commit("settings/setIsSmallScreen", isSmallScreen);
  }
}

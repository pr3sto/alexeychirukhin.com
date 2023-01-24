import * as scssVars from "~/assets/scss/_variables.scss";

export default ({ $services }, inject) => {
  detectScreenSize($services.settings);
  window.onresize = () => {
    detectScreenSize($services.settings);
  };

  const utility = {
    disablePageScroll: () => {
      document.body.classList.add("non-scrollable");
      document.documentElement.classList.add("non-scrollable");
    },
    enablePageScroll: () => {
      document.body.classList.remove("non-scrollable");
      document.documentElement.classList.remove("non-scrollable");
    },
  };

  inject("pageUtility", utility);
};

function detectScreenSize(settingsService) {
  const storedValue = settingsService.isSmallScreen();

  const isSmallScreen = window.matchMedia(
    `(max-width: ${scssVars.mediaMobileMaxWidth})`
  ).matches;

  if (storedValue !== isSmallScreen) {
    settingsService.setIsSmallScreen(isSmallScreen);
  }
}

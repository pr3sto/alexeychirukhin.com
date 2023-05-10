import * as scssVars from "~/assets/scss/_variables.scss";

export default ({ $services }, inject) => {
  detectScreenSize($services.settings);
  window.onresize = () => {
    detectScreenSize($services.settings);
  };

  const utilities = {
    disablePageScroll: () => {
      document.body.classList.add("non-scrollable");
      document.documentElement.classList.add("non-scrollable");
    },
    enablePageScroll: () => {
      document.body.classList.remove("non-scrollable");
      document.documentElement.classList.remove("non-scrollable");
    },
  };

  inject("pageUtility", utilities);
};

function detectScreenSize(settingsService) {
  const storedValue = settingsService.useMobileVersion();

  const useMobileVersion = window.matchMedia(
    `(max-width: ${scssVars.mediaMobileMaxWidth})`
  ).matches;

  if (storedValue !== useMobileVersion) {
    settingsService.setUseMobileVersion(useMobileVersion);
  }
}

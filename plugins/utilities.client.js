import * as scssVars from "~/assets/scss/_variables.scss";
import lodash from "lodash";
import Vue from "vue";
import VueLodash from "vue-lodash";

Vue.use(VueLodash, { name: "$_", lodash });

export default function ({ $services }, inject) {
  detectScreenSize($services.settings);
  window.onresize = lodash.throttle(() => {
    detectScreenSize($services.settings);
  }, 50);

  const utilities = {
    getPageScrollTopOffset() {
      return document.documentElement.scrollTop || document.body.scrollTop;
    },
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    disablePageScroll() {
      document.body.classList.add("non-scrollable");
      document.documentElement.classList.add("non-scrollable");
    },
    enablePageScroll() {
      document.body.classList.remove("non-scrollable");
      document.documentElement.classList.remove("non-scrollable");
    },
  };

  inject("pageUtility", utilities);
}

function detectScreenSize(settingsService) {
  const useMobileVersion = window.matchMedia(
    `(max-width: ${scssVars.mediaMobileMaxWidth})`
  ).matches;
  const viewportHeight = document.documentElement.clientHeight;

  if (settingsService.getUseMobileVersion() !== useMobileVersion) {
    settingsService.setUseMobileVersion(useMobileVersion);
  }
  if (settingsService.getViewportHeight() !== viewportHeight) {
    settingsService.setViewportHeight(viewportHeight);
  }
}

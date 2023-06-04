import * as scssVars from "~/assets/scss/_variables.scss";
import lodash from "lodash";
import Vue from "vue";
import VueLodash from "vue-lodash";

Vue.use(VueLodash, { name: "$_", lodash });

let savedScrollPosition = null;
let pageScrollDisabled = false;

export default function ({ $services }, inject) {
  detectScreenSize($services.settings, $services.styles);
  window.onresize = lodash.throttle(() => {
    detectScreenSize($services.settings, $services.styles);
  }, 50);

  const utilities = {
    getPageScrollTopOffset() {
      return (
        window.scrollY ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0
      );
    },
    getPageScrollLeftOffset() {
      return (
        window.scrollX ||
        document.documentElement.scrollLeft ||
        document.body.scrollLeft ||
        0
      );
    },
    getScrollPosition() {
      return {
        x: this.getPageScrollLeftOffset(),
        y: this.getPageScrollTopOffset(),
      };
    },
    scrollTo(scrollPosition) {
      window.scrollTo(scrollPosition.x, scrollPosition.y);
    },
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    disablePageScroll() {
      savedScrollPosition = this.getScrollPosition();
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${savedScrollPosition.y}px`;
      pageScrollDisabled = true;
    },
    enablePageScroll() {
      if (pageScrollDisabled) {
        document.body.style.overflow = "";
        document.body.style.position = "";
        document.body.style.top = "";
        if (savedScrollPosition) {
          this.scrollTo(savedScrollPosition);
          savedScrollPosition = null;
        }
        pageScrollDisabled = false;
      }
    },
  };

  inject("pageUtility", utilities);
}

function detectScreenSize(settingsService, stylesService) {
  const useMobileVersion = window.matchMedia(
    `(max-width: ${scssVars.mediaMobileMaxWidth})`
  ).matches;

  if (settingsService.getUseMobileVersion() !== useMobileVersion) {
    settingsService.setUseMobileVersion(useMobileVersion);
  }

  const viewportHeight = document.documentElement.clientHeight;
  stylesService.setRootVariable("--viewport-height", `${viewportHeight}px`);
}

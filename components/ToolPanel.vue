<template>
  <div
    class="tool-panel"
    :class="{
      'tool-panel--sm': useMobileVersion,
      'tool-panel--lg': !useMobileVersion,
    }"
  >
    <transition name="opacity-transition-02s">
      <div class="tool-panel-scroll-top" v-if="showScrollToTop">
        <div
          class="tool-panel-scroll-top-icon"
          title="Scroll to top"
          v-on:click="handleScrollToTopClick"
        >
          <inline-svg :src="require('~/assets/icons/scrollup.svg')" />
        </div>
      </div>
    </transition>
    <div class="tool-panel-links">
      <a
        class="tool-panel-link"
        target="_blank"
        :href="links.INSTAGRAM_URL"
        title="Instagram"
        ><inline-svg :src="require('~/assets/logos/instagram.svg')"
      /></a>
      <a
        class="tool-panel-link"
        target="_blank"
        :href="links.GITHUB_URL"
        title="Github"
        ><inline-svg :src="require('~/assets/logos/github.svg')"
      /></a>
      <a class="tool-panel-link" :href="originUrl" title="Alexey Chirukhin"
        ><inline-svg :src="require('~/assets/logos/pr3sto.svg')"
      /></a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "~/assets/scss/variables" as vars;

.tool-panel {
  display: flex;
}

.tool-panel-scroll-top {
  padding: vars.$general__padding--default;
}

.tool-panel-links {
  display: flex;
  padding: vars.$general__padding--default;
}

.tool-panel-link {
  display: block;
}

/* styles for lg screen */
.tool-panel--lg {
  position: sticky;
  top: 0;
  flex-direction: column;
  justify-content: flex-end;
  height: 100vh;
  border-right: 2px solid var(vars.$page-styles__font-color);

  .tool-panel-scroll-top {
    margin-top: vars.$general__padding--default;
    margin-bottom: auto;
  }

  .tool-panel-scroll-top-icon {
    width: vars.$tool-panel__element__size--lg;
    height: vars.$tool-panel__element__size--lg;
    cursor: pointer;
  }

  .tool-panel-links {
    flex-direction: column;
  }

  .tool-panel-link {
    width: vars.$tool-panel__element__size--lg;
    height: vars.$tool-panel__element__size--lg;
    margin-bottom: vars.$general__padding--default;
  }
}

/* styles for sm screen */
.tool-panel--sm {
  flex-direction: row-reverse;
  justify-content: flex-end;

  .tool-panel-scroll-top {
    padding-left: vars.$general__padding--default;
    margin-left: auto;
  }

  .tool-panel-scroll-top-icon {
    width: vars.$tool-panel__element__size--sm;
    height: vars.$tool-panel__element__size--sm;
    cursor: pointer;
  }

  .tool-panel-links {
    flex-direction: row-reverse;
  }

  .tool-panel-link {
    width: vars.$tool-panel__element__size--sm;
    height: vars.$tool-panel__element__size--sm;
    margin-right: vars.$general__padding--default;
  }
}
</style>

<style lang="scss">
@use "~/assets/scss/variables" as vars;

.tool-panel-link svg path {
  fill: var(vars.$page-styles__font-color);
}
.tool-panel-scroll-top-icon svg * {
  stroke: var(vars.$page-styles__font-color);
}
</style>

<script>
import links from "~/constants/links.js";

export default {
  name: "ToolPanel",

  computed: {
    useMobileVersion() {
      return this.$services.settings.getUseMobileVersion();
    },
  },

  data() {
    return {
      showScrollToTop: false,
      links: links,
      originUrl: window.location.origin,
    };
  },

  mounted() {
    window.addEventListener(
      "scroll",
      this.lodash.throttle(this.handleScroll, 250)
    );
  },

  beforeDestroy() {
    this.cleanupEventListeners();
  },

  methods: {
    handleScroll() {
      this.showScrollToTop = this.$pageUtility.getPageScrollTopOffset() > 100;
    },
    handleScrollToTopClick() {
      this.$pageUtility.scrollToTop();
    },
    cleanupEventListeners() {
      window.removeEventListener("scroll", this.handleScroll);
    },
  },
};
</script>

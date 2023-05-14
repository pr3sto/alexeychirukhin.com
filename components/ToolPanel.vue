<template>
  <div
    class="tool-panel"
    :class="{
      'tool-panel--sm': useMobileVersion,
      'tool-panel--lg': !useMobileVersion,
    }"
  >
    <transition name="opacity-transition">
      <div
        class="tool-panel-scroll-top"
        v-if="showScrollToTop"
        v-on:click="scrollToTop"
      >
        <div class="tool-panel-scroll-top-icon">
          <inline-svg :src="require('~/assets/icons/scrollup.svg')" />
        </div>
      </div>
    </transition>
    <div class="tool-panel-links">
      <a
        class="tool-panel-link"
        href="https://instagram.com/alexeychirukhin"
        target="_blank"
        ><inline-svg :src="require('~/assets/logos/instagram.svg')"
      /></a>
      <a
        class="tool-panel-link"
        href="https://github.com/pr3sto"
        target="_blank"
        ><inline-svg :src="require('~/assets/logos/github.svg')"
      /></a>
      <a
        class="tool-panel-link"
        href="https://alexeychirukhin.com"
        target="_blank"
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
  padding: vars.$default-padding;
}

.tool-panel-scroll-top-icon {
  width: vars.$tool-panel-element-size;
  height: vars.$tool-panel-element-size;
}

.tool-panel-links {
  display: flex;
  padding: vars.$default-padding;
}

.tool-panel-link {
  display: block;
  width: vars.$tool-panel-element-size;
  height: vars.$tool-panel-element-size;
}

/* styles for lg screen */
.tool-panel--lg {
  position: sticky;
  top: 0;
  flex-direction: column;
  justify-content: flex-end;
  height: 100vh;
  border-right: 2px solid;
  border-image: linear-gradient(
      to top,
      var(--styles-font-color) 50%,
      85%,
      transparent 100%
    )
    1;

  .tool-panel-scroll-top {
    padding-bottom: calc(vars.$default-padding * 2);
    cursor: pointer;
  }

  .tool-panel-links {
    flex-direction: column;
  }

  .tool-panel-link {
    margin-bottom: vars.$default-padding;
  }
}

/* styles for sm screen */
.tool-panel--sm {
  flex-direction: row-reverse;
  justify-content: flex-end;

  .tool-panel-scroll-top {
    padding-left: vars.$default-padding;
    margin-left: auto;
  }

  .tool-panel-links {
    flex-direction: row-reverse;
  }

  .tool-panel-link {
    margin-right: vars.$default-padding;
  }
}
</style>

<style lang="scss">
.tool-panel-link svg path {
  fill: var(--styles-font-color);
}
.tool-panel-scroll-top-icon svg * {
  stroke: var(--styles-font-color);
}
</style>

<script>
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
    scrollToTop() {
      this.$pageUtility.scrollToTop();
    },
    cleanupEventListeners() {
      window.removeEventListener("scroll", this.handleScroll);
    },
  },
};
</script>

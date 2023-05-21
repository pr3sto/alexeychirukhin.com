<template>
  <div
    class="page"
    :class="{
      'page--sm': useMobileVersion,
      'page--lg': !useMobileVersion,
      'page--fit-screen': data && data.style.fitScreen,
    }"
    :style="cssVars"
  >
    <tool-panel />
    <page-content-builder
      class="page-content"
      :components="data && data.components"
    />
    <app-menu :menu="menu" />
  </div>
</template>

<style lang="scss" scoped>
@use "~/assets/scss/variables" as vars;

.page {
  display: flex;
  min-height: var(--page-height);
  background: var(--styles-background-color);
  color: var(--styles-font-color);

  &--lg {
    flex-direction: row;
  }
  &--sm {
    flex-direction: column-reverse;
  }

  &--fit-screen {
    height: var(--page-height);
  }
}

.page-content {
  flex: 1;
}
</style>

<script>
import AppMenu from "./AppMenu/AppMenu.vue";
import PageContentBuilder from "./PageContent/PageContentBuilder.vue";
import ToolPanel from "./ToolPanel.vue";

export default {
  name: "Page",
  props: ["data"],
  components: { AppMenu, PageContentBuilder, ToolPanel },

  computed: {
    useMobileVersion() {
      return this.$services.settings.getUseMobileVersion();
    },
    viewportHeight() {
      return this.$services.settings.getViewportHeight();
    },
    menu() {
      return this.$services.menu.getMenuByRoute(this.$route.path);
    },
    cssVars() {
      return {
        "--page-height": `${this.viewportHeight}px`,
      };
    },
  },
};
</script>

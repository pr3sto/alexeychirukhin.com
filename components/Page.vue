<template>
  <div
    class="page"
    :class="{
      'page--sm': isMobileVersion,
      'page--lg': !isMobileVersion,
      'page--fit-screen': data && data.settings.fitScreen,
    }"
    :style="cssVars"
  >
    <page-content-builder
      class="page-content"
      :components="data && data.components"
    />
    <app-menu />
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

export default {
  components: { AppMenu, PageContentBuilder },
  props: ["data"],

  computed: {
    isMobileVersion() {
      return this.$services.settings.useMobileVersion();
    },
    viewportHeight() {
      return this.$services.settings.viewportHeight();
    },
    cssVars() {
      return {
        "--page-height": `${this.viewportHeight}px`,
      };
    },
  },
};
</script>

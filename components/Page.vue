<template>
  <div class="page" :class="isMobileVersion ? 'page--sm' : 'page--lg'">
    <page-content-builder
      class="page-content"
      :components="data && data.components"
      :fitScreen="data && data.settings.fitScreen"
    />
    <app-menu />
  </div>
</template>

<style lang="scss" scoped>
@use "~/assets/scss/variables" as vars;

.page {
  display: flex;
  background: var(--styles-background-color);
  color: var(--styles-font-color);

  &--lg {
    flex-direction: row;
  }
  &--sm {
    flex-direction: column-reverse;
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
  },
};
</script>

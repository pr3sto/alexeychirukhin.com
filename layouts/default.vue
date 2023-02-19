<template>
  <div
    id="default-layout"
    :class="smallScreen ? 'default-layout--sm' : 'default-layout--lg'"
  >
    <nuxt-child id="default-layout-page" />
    <app-menu-sm v-if="smallScreen" id="default-layout-menu" />
    <app-menu-lg v-else id="default-layout-menu" />
  </div>
</template>

<style lang="scss">
@use "~/assets/scss/variables" as vars;

#default-layout {
  display: flex;
  position: relative;
  min-height: 100vh;
  background: var(--styles-background-color);

  /* texture */
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: url(~/assets/noise.svg);
    filter: contrast(100%) brightness(200%) opacity(20%);
    mix-blend-mode: plus-lighter;
    pointer-events: none;
  }
}

.default-layout--lg {
  flex-direction: row;
}

.default-layout--sm {
  flex-direction: column-reverse;
}

#default-layout-page {
  flex: 1;
}

#default-layout-menu {
  padding: vars.$default-padding;
}

/* Nuxt pages transition */
.page-enter-active {
  transition: opacity 0.25s;
}
.page-enter {
  opacity: 0.5;
}
</style>

<script>
import AppMenuSm from "~/components/AppMenu/AppMenuSm.vue";
import AppMenuLg from "~/components/AppMenu/AppMenuLg.vue";

export default {
  components: { AppMenuSm, AppMenuLg },

  computed: {
    smallScreen() {
      return this.$services.settings.isSmallScreen();
    },
  },
};
</script>

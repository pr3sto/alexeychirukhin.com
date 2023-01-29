<template>
  <div :id="smallScreen ? 'default-layout-sm' : 'default-layout-lg'">
    <nuxt-child
      :id="smallScreen ? 'default-layout-page-sm' : 'default-layout-page-lg'"
    />
    <app-menu-sm v-if="smallScreen" id="default-layout-menu" />
    <app-menu-lg v-else id="default-layout-menu" />
  </div>
</template>

<style lang="scss">
@use "~/assets/scss/variables" as vars;

#default-layout-lg {
  display: flex;
  flex-direction: row;
  min-height: 100vh;
}
#default-layout-page-lg {
  flex-grow: 1;
}

#default-layout-sm {
  display: flex;
  flex-direction: column-reverse;
  min-height: 100vh;
}
#default-layout-page-sm {
  flex-grow: 1;
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

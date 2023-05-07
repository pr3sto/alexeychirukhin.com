<template>
  <app-menu-sm v-if="smallScreen" />
  <app-menu-lg v-else />
</template>

<script>
import AppMenuSm from "./AppMenuSm.vue";
import AppMenuLg from "./AppMenuLg.vue";

export default {
  components: { AppMenuSm, AppMenuLg },

  computed: {
    smallScreen() {
      return this.$services.settings.isSmallScreen();
    },
  },
};
</script>

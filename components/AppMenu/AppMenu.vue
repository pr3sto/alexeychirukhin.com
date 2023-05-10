<template>
  <app-menu-sm v-if="isMobileVersion" />
  <app-menu-lg v-else />
</template>

<script>
import AppMenuSm from "./AppMenuSm.vue";
import AppMenuLg from "./AppMenuLg.vue";

export default {
  components: { AppMenuSm, AppMenuLg },

  computed: {
    isMobileVersion() {
      return this.$services.settings.useMobileVersion();
    },
  },
};
</script>

<template>
  <app-menu-sm :menu="menu" v-if="useMobileVersion" />
  <app-menu-lg :menu="menu" v-else />
</template>

<script>
import AppMenuSm from "./AppMenuSm.vue";
import AppMenuLg from "./AppMenuLg.vue";

export default {
  name: "AppMenu",
  props: ["menu"],
  components: { AppMenuSm, AppMenuLg },

  computed: {
    useMobileVersion() {
      return this.$services.settings.getUseMobileVersion();
    },
  },
};
</script>

<template>
  <app-menu-sm :menu="menu" v-if="useMobileVersion" />
  <app-menu-lg :menu="menu" v-else />
</template>

<script>
import AppMenuLg from "./AppMenuLg.vue";
import AppMenuSm from "./AppMenuSm.vue";

export default {
  name: "AppMenu",
  props: ["menu"],
  components: { AppMenuLg, AppMenuSm },

  computed: {
    useMobileVersion() {
      return this.$services.settings.getUseMobileVersion();
    },
  },
};
</script>

<template>
  <photo-fullscreen-sm v-if="useMobileVersion" />
  <photo-fullscreen-lg v-else />
</template>

<script>
import PhotoFullscreenLg from "./PhotoFullscreenLg.vue";
import PhotoFullscreenSm from "./PhotoFullscreenSm.vue";

export default {
  name: "PhotoFullscreen",
  components: { PhotoFullscreenLg, PhotoFullscreenSm },

  computed: {
    useMobileVersion() {
      return this.$services.settings.getUseMobileVersion();
    },
  },
};
</script>

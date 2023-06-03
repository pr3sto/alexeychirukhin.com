<template>
  <photo-fullscreen-sm v-if="useMobileVersion" />
  <photo-fullscreen-lg v-else />
</template>

<script>
import PhotoFullscreenSm from "./PhotoFullscreenSm.vue";
import PhotoFullscreenLg from "./PhotoFullscreenLg.vue";

export default {
  name: "PhotoFullscreen",
  components: { PhotoFullscreenSm, PhotoFullscreenLg },

  computed: {
    useMobileVersion() {
      return this.$services.settings.getUseMobileVersion();
    },
  },
};
</script>

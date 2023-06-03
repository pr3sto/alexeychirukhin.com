<template>
  <div>
    <Nuxt />
    <div class="grain" />
    <overlay class="overlay" />
  </div>
</template>

<style lang="scss">
@use "~/assets/scss/variables" as vars;

.grain {
  content: "";
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: url(~/assets/textures/noise.svg);
  filter: brightness(150%) opacity(15%);
  z-index: 1;
  pointer-events: none;
}

.overlay {
  position: absolute;
  z-index: 2;
}

/* Nuxt pages transition */
.page-enter-active {
  transition: opacity vars.$general__transition--03s;
}
.page-enter {
  opacity: 0;
}
</style>

<script>
import Overlay from "~/components/Overlay.vue";

export default {
  components: { Overlay },
};
</script>

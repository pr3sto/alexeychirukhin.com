<template>
  <div class="layout">
    <Nuxt />
    <div class="grain" />
    <overlay class="overlay" />
  </div>
</template>

<style lang="scss">
@use "~/assets/scss/variables" as vars;

.layout {
  color: var(--page-font-color);
  background: var(--page-background-color);
}

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
</style>

<script>
import Overlay from "~/components/Overlay.vue";

export default {
  components: { Overlay },
};
</script>

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
  color: var(vars.$page-styles__font-color);
  background: var(vars.$page-styles__background-color);
  transition: background linear 0.8s;
}

.grain {
  content: "";
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: url(~/assets/textures/noise.svg);
  filter: brightness(110%) opacity(20%);
  z-index: 1;
  pointer-events: none;
}

.overlay {
  position: absolute;
  z-index: 2;
}

.page-leave-active {
  transition: opacity 0.5s;
}
.page-leave-to {
  opacity: 0;
}

.page-enter-active {
  transition: filter 1.2s, opacity 1s;
}
.page-enter {
  opacity: 0;
  filter: blur(15px) brightness(20);
}
</style>

<script>
import Overlay from "~/components/Overlay.vue";

export default {
  components: { Overlay },
};
</script>

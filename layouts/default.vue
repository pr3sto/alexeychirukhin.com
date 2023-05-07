<template>
  <div id="default-layout">
    <figure class="grain" />
    <Nuxt id="default-layout-page" />
  </div>
</template>

<style lang="scss">
@use "~/assets/scss/variables" as vars;

#default-layout {
  display: flex;
  z-index: 0; /* creates stacking context */
  min-height: 100vh;
}

#default-layout-page {
  flex: 1;
}

.grain {
  content: "";
  position: fixed;
  z-index: 1;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: url(~/assets/noise.svg);
  filter: brightness(200%) opacity(20%);
  mix-blend-mode: plus-lighter;
  pointer-events: none;
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
export default {};
</script>

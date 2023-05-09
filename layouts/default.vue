<template>
  <div id="default-layout">
    <Nuxt id="default-layout-page" />
    <div class="grain" />
  </div>
</template>

<style lang="scss">
@use "~/assets/scss/variables" as vars;

#default-layout {
  display: flex;
  min-height: 100vh;
}

#default-layout-page {
  flex: 1;
}

.grain {
  content: "";
  position: fixed;
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

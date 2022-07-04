<template>
  <aside v-show="text" class="floating-text">
    <p>{{ text }}</p>
  </aside>
</template>

<style scoped>
.floating-text {
  color: white;
  mix-blend-mode: exclusion;
}
</style>

<script>
export default {
  name: "FloatingText",
  computed: {
    text() {
      var page = this.$store.getters["data/currentPage"](this.$route.path);
      return page.floatingText ? page.floatingText : "";
    },
  },
};
</script>

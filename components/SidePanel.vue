<template>
  <aside class="side-panel">
    <p>{{ text }}</p>
  </aside>
</template>

<style scoped>
.side-panel {
  writing-mode: vertical-rl;
}

@media only screen and (max-width: 700px) {
  .side-panel {
    writing-mode: initial;
  }
}
</style>

<script>
export default {
  name: "SidePanel",
  computed: {
    text() {
      var page = this.$store.getters['data/currentPage'](this.$route.path);
      if (page.sidePanelText) {
        return page.sidePanelText;
      } else if (page.menuItemSection) {
        return page.menuItemSection + " - " + page.menuItemText;
      } else {
        return page.menuItemText;
      }
    },
  },
};
</script>

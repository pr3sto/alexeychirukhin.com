<template>
  <div class="side-panel">
    {{ text }}
  </div>
</template>

<style>
.side-panel {
  writing-mode: vertical-lr;
}

@media only screen and (max-width: 700px) {
  .side-panel {
    writing-mode: horizontal-tb;
  }
}
</style>

<script>
export default {
  name: "SidePanel",
  computed: {
    text() {
      var page = this.$store.state.data.pages.find(
        (page) => page.route === this.$route.path
      );
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

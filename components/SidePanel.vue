<template>
  <aside class="side-panel">
    <p>{{ text }}</p>
  </aside>
</template>

<script>
export default {
  name: "SidePanel",
  computed: {
    text() {
      var page = this.$store.getters["data/currentPage"](this.$route.path);
      if (page.sidePanelText) {
        return page.sidePanelText;
      } else {
        return "";
      }
    },
  },
};
</script>

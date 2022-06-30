<template>
  <aside class="side-panel">
    <transition name="opacity-transition">
      <p :key="textHash">{{ text }}</p>
    </transition>
  </aside>
</template>

<style scoped>
.side-panel {
  writing-mode: vertical-lr;
}

/* transition opacity */
.opacity-transition-enter-active {
  transition: opacity 0.2s cubic-bezier(0.8, 0.2, 0.1, 0.8);
}
.opacity-transition-enter {
  opacity: 0;
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
      var page = this.$store.getters["data/currentPage"](this.$route.path);
      if (page.sidePanelText) {
        return page.sidePanelText;
      } else if (page.menuItemSection) {
        return page.menuItemSection + " - " + page.menuItemText;
      } else {
        return page.menuItemText;
      }
    },
    textHash() {
      return this.text.split("").reduce(function (a, b) {
        a = (a << 5) - a + b.charCodeAt(0);
        return a & a;
      }, 0);
    },
  },
};
</script>

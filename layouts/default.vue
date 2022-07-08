<template>
  <div id="default-layout">
    <nuxt id="default-layout-page" />
    <app-menu id="default-layout-appmenu" />
  </div>
</template>

<style>
#default-layout {
  display: flex;
  flex-direction: row;
}
#default-layout-page {
  flex-grow: 1;
  padding: 1em 0 1em 1em;
}
#default-layout-appmenu {
  position: sticky;
  align-self: baseline;
  top: 0;
  padding-top: 1em;
  padding-bottom: 1em;
}

@media only screen and (max-width: 700px) {
  #default-layout {
    flex-direction: column-reverse;
  }
  #default-layout-page {
    padding: 0 1em 1em 1em;
  }
  #default-layout-appmenu {
    position: static;
  }
}
</style>

<script>
import AppMenu from "~/components/AppMenu.vue";

export default {
  components: { AppMenu },

  mounted() {
    this.$nextTick(() => {
      this.reCalculate();
    });

    window.addEventListener("resize", this.reCalculate);
  },

  updated() {
    this.$nextTick(() => {
      this.reCalculate();
    });
  },

  beforeDestroy() {
    window.removeEventListener("resize", this.reCalculate);
  },

  methods: {
    reCalculate: function () {
      // set min height of layout to screen height
      this.$el.style.minHeight = `${document.documentElement.clientHeight}px`;

      // small screen if width of screen is 700px
      var isSmallScreen = window.matchMedia("(max-width: 700px)").matches;
      this.$store.commit('data/setSmallScreen', isSmallScreen);
    },
  },
};
</script>

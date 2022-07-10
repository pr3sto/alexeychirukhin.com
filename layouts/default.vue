<template>
  <div
    id="default-layout"
    :class="{
      'default-layout--lg': !isSmallScreen,
      'default-layout--sm': isSmallScreen,
    }"
  >
    <nuxt id="default-layout-page" />
    <app-menu id="default-layout-appmenu" />
  </div>
</template>

<style>
#default-layout {
  display: flex;
}
.default-layout--lg {
  flex-direction: row;
}
.default-layout--sm {
  flex-direction: column-reverse;
}

#default-layout-page {
  flex-grow: 1;
}
.default-layout--lg #default-layout-page {
  padding: 1rem 0 1rem 1rem;
}
.default-layout--sm #default-layout-page {
  padding: 0 1rem 1rem 1rem;
}

#default-layout-appmenu {
  align-self: baseline;
  top: 0;
}
.default-layout--lg #default-layout-appmenu {
  position: sticky;
}
.default-layout--sm #default-layout-appmenu {
  position: static;
}
</style>

<script>
import AppMenu from "~/components/AppMenu.vue";

export default {
  components: { AppMenu },

  computed: {
    isSmallScreen() {
      return this.$store.state.data.isSmallScreen;
    },
  },

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
      this.$store.commit("data/setSmallScreen", isSmallScreen);
    },
  },
};
</script>

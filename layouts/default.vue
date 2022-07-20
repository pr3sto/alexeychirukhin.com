<template>
  <div
    id="default-layout"
    :class="{
      'default-layout--lg': !isSmallScreen,
      'default-layout--sm': isSmallScreen,
    }"
  >
    <nuxt
      id="default-layout-page"
      :class="{
        'default-layout-page--lg': !isSmallScreen,
        'default-layout-page--sm': isSmallScreen,
      }"
    />
    <app-menu />
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
.default-layout-page--lg {
  padding: 1rem 0 1rem 1rem;
}
.default-layout-page--sm {
  padding: 0 1rem 1rem 1rem;
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

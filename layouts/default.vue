<template>
  <div :id="smallScreen ? 'default-layout-sm' : 'default-layout'">
    <NuxtChild
      :id="smallScreen ? 'default-layout-page-sm' : 'default-layout-page'"
    />
    <app-menu-sm v-if="smallScreen" />
    <app-menu-lg v-else />
  </div>
</template>

<style>
#default-layout {
  display: flex;
  flex-direction: row;
}
#default-layout-page {
  flex-grow: 1;
  padding: 1rem 0 1rem 1rem;
}

#default-layout-sm {
  display: flex;
  flex-direction: column-reverse;
}
#default-layout-page-sm {
  flex-grow: 1;
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
import AppMenuSm from "~/components/AppMenu/AppMenuSm.vue";
import AppMenuLg from "~/components/AppMenu/AppMenuLg.vue";

export default {
  components: { AppMenuSm, AppMenuLg },

  computed: {
    smallScreen() {
      return this.$store.state.settings.isSmallScreen;
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
    reCalculate() {
      // set min height of layout to screen height
      this.$el.style.minHeight = `${document.documentElement.clientHeight}px`;
    },
  },
};
</script>

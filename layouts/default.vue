<template>
  <div
    :id="smallScreen ? 'default-layout-sm' : 'default-layout-lg'"
    :style="cssVars"
  >
    <nuxt-child
      :id="smallScreen ? 'default-layout-page-sm' : 'default-layout-page-lg'"
    />
    <app-menu-sm v-if="smallScreen" id="default-layout-menu" />
    <app-menu-lg v-else id="default-layout-menu" />
  </div>
</template>

<style>
#default-layout-lg {
  display: flex;
  flex-direction: row;
  min-height: var(--min-height);
}
#default-layout-page-lg {
  flex-grow: 1;
}

#default-layout-sm {
  display: flex;
  flex-direction: column-reverse;
  min-height: var(--min-height);
}
#default-layout-page-sm {
  flex-grow: 1;
}

#default-layout-menu {
  padding: 1rem;
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
    cssVars() {
      return {
        "--min-height": `${this.minHeight}px`,
      };
    },
  },

  data() {
    return {
      minHeight: 0,
    };
  },

  mounted() {
    this.$nextTick(() => {
      this.reCalculate();
    });

    window.addEventListener("resize", this.reCalculate);
  },

  beforeDestroy() {
    this.cleanupEventListeners();
  },

  methods: {
    reCalculate() {
      // set min height of layout to screen height
      this.minHeight = document.documentElement.clientHeight;
    },
    cleanupEventListeners() {
      window.removeEventListener("resize", this.reCalculate);
    },
  },
};
</script>

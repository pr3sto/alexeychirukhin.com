<template>
  <div
    :id="smallScreen ? 'default-layout-sm' : 'default-layout'"
    :style="cssVars"
  >
    <nuxt-child
      :id="smallScreen ? 'default-layout-page-sm' : 'default-layout-page'"
    />
    <app-menu-sm id="default-layout-menu" v-if="smallScreen" />
    <app-menu-lg id="default-layout-menu" v-else />
  </div>
</template>

<style>
#default-layout {
  display: flex;
  flex-direction: row;
  min-height: var(--min-height);
}
#default-layout-page {
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
    window.removeEventListener("resize", this.reCalculate);
  },

  methods: {
    reCalculate() {
      // set min height of layout to screen height
      this.minHeight = document.documentElement.clientHeight;
    },
  },
};
</script>

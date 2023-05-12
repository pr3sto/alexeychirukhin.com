<template>
  <div id="default-layout" :style="cssVars">
    <Nuxt id="default-layout-page" />
    <div class="grain" />
  </div>
</template>

<style lang="scss">
@use "~/assets/scss/variables" as vars;

#default-layout {
  display: flex;
  min-height: var(--min-height);
}

#default-layout-page {
  flex: 1;
}

.grain {
  content: "";
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: url(~/assets/noise.svg);
  filter: brightness(200%) opacity(20%);
  mix-blend-mode: plus-lighter;
  pointer-events: none;
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
export default {
  computed: {
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

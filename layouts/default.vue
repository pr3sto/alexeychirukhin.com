<template>
  <div
    id="default-layout"
    :class="{
      'default-layout--lg': !small,
      'default-layout--sm': small,
    }"
  >
    <NuxtChild
      id="default-layout-page"
      :class="{
        'default-layout-page--lg': !small,
        'default-layout-page--sm': small,
      }"
      :small="small"
    />
    <app-menu :small="small" />
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

  data() {
    return {
      small: false,
    };
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
      this.small = window.matchMedia("(max-width: 700px)").matches;
    },
  },
};
</script>

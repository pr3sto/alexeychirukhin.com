<template>
  <div id="default-layout">
    <side-panel id="default-layout-sidepanel" />
    <nuxt id="default-layout-page" />
    <app-menu id="default-layout-appmenu" />
  </div>
</template>

<style>
#default-layout {
  display: flex;
  flex-direction: row;
  background: radial-gradient(
      circle,
      rgba(255, 255, 255, 0.5) 85%,
      rgba(215, 215, 215, 0.5) 100%
    ),
    url("../assets/noise.svg");
}

#default-layout-page {
  flex-grow: 1;
  padding: 1em 0 1em 1em;
}

#default-layout-sidepanel {
  position: fixed;
  top: 0;
  padding: 1em;
  color: white;
  mix-blend-mode: exclusion;
  z-index: 999;
}

#default-layout-appmenu {
  position: sticky;
  align-self: baseline;
  top: 0;
  padding-top: 1em;
  padding-bottom: 1em;
}

/* Nuxt pages transition */
.page-enter-active {
  transition: opacity 0.25s;
}
.page-enter {
  opacity: 0.5;
}

@media only screen and (max-width: 700px) {
  #default-layout {
    flex-direction: column-reverse;
  }
  #default-layout-page {
    padding: 0 1em 1em 1em;
  }
  #default-layout-sidepanel {
    top: auto;
    bottom: 0;
  }
  #default-layout-appmenu {
    position: static;
  }
}
</style>

<script>
import AppMenu from "~/components/AppMenu.vue";
import SidePanel from "~/components/SidePanel.vue";

export default {
  components: { AppMenu, SidePanel },

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
      this.$el.style.minHeight = `${window.innerHeight}px`;
    },
  },
};
</script>

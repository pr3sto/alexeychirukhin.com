<template>
  <menu class="app-menu">
    <p class="app-menu-header" v-on:click="handleAppMenuHeaderClicked">
      {{ currentHeader }}
    </p>
    <transition
      name="opacity-transition"
      v-on:before-enter="beforeFullscreenAppMenuOpened"
      v-on:after-leave="afterFullscreenAppMenuClosed"
    >
      <div
        class="app-menu-full"
        v-show="showFullscreenAppMenu"
        v-on:click="handleFullscreenAppMenuClicked"
      >
        <section
          class="app-menu-full-section"
          v-for="(sectionItems, sectionName, index) of menuSections"
          :key="index"
        >
          <p class="app-menu-full-section-header" v-show="sectionName !== ''">
            {{ sectionName }}
          </p>
          <div v-for="(item, index1) of sectionItems" :key="index1">
            <nuxt-link class="app-menu-full-section-link" :to="item.route">
              {{ item.header }}
            </nuxt-link>
          </div>
        </section>
      </div>
    </transition>
  </menu>
</template>

<style lang="scss" scoped>
@use "~/assets/scss/variables" as vars;

.app-menu-header {
  display: inline-block;
  padding: 1rem;
  color: vars.$font-color;
  font-family: vars.$secondary-font-family;
  font-size: vars.$default-font-size-sm;
  font-weight: bolder;
  text-transform: uppercase;
  cursor: pointer;
}

.app-menu-full {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1rem;
  background: vars.$background-color;
}

.app-menu-full-section {
  display: flex;
  flex-direction: column;
  padding-bottom: 1rem;
  font-size: vars.$default-font-size-sm;
}

.app-menu-full-section-header {
  padding-left: 1rem;
  padding-right: 1rem;
  color: vars.$font-color;
  font-size: 0.75em;
  opacity: 0.75;
}

.app-menu-full-section-link {
  padding-left: 1rem;
  padding-right: 1rem;
  color: vars.$font-color;
  text-decoration: none;
  white-space: nowrap;

  &.nuxt-link-exact-active {
    font-family: vars.$secondary-font-family;
    font-weight: bolder;
    text-transform: uppercase;
  }
}
</style>

<script>
export default {
  name: "AppMenuSm",

  computed: {
    menuSections() {
      return this.$store.state.data.menuSections;
    },
    currentHeader() {
      return this.$store.getters["data/currentMenuHeader"](this.$route.path);
    },
  },

  data() {
    return {
      showFullscreenAppMenu: false,
    };
  },

  methods: {
    handleAppMenuHeaderClicked() {
      this.showFullscreenAppMenu = true;
    },
    handleFullscreenAppMenuClicked() {
      this.showFullscreenAppMenu = false;
    },
    beforeFullscreenAppMenuOpened() {
      // disable scroll on html when fullscreen opened
      document.body.classList.add("non-scrollable");
      document.documentElement.classList.add("non-scrollable");
    },
    afterFullscreenAppMenuClosed() {
      // enable scroll on html when fullscreen closed
      document.body.classList.remove("non-scrollable");
      document.documentElement.classList.remove("non-scrollable");
    },
  },
};
</script>

<template>
  <menu class="app-menu">
    <p class="app-menu-header" v-on:click="handleAppMenuHeaderClicked">
      {{ currentHeader }}
    </p>
    <transition
      name="opacity-transition"
      v-on:after-enter="afterFullscreenAppMenuOpened"
      v-on:before-leave="beforeFullscreenAppMenuClosed"
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
  padding-left: vars.$default-padding;
  padding-right: vars.$default-padding;
  color: vars.$font-color;
  font-family: vars.$secondary-font-family;
  font-size: vars.$appmenu-font-size;
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
  padding: vars.$default-padding;
  background: vars.$background-color;
}

.app-menu-full-section {
  display: flex;
  flex-direction: column;
  padding-bottom: vars.$default-padding;
  font-size: vars.$appmenu-font-size;
}

.app-menu-full-section-header {
  padding-left: vars.$default-padding;
  padding-right: vars.$default-padding;
  color: vars.$font-color;
  font-size: vars.$appmenu-section-header-font-size;
  opacity: 0.75;
}

.app-menu-full-section-link {
  padding-left: vars.$default-padding;
  padding-right: vars.$default-padding;
  color: vars.$font-color;
  text-decoration: none;
  overflow-wrap: break-word;
  box-decoration-break: clone;

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
    afterFullscreenAppMenuOpened() {
      this.$disablePageScroll();
    },
    beforeFullscreenAppMenuClosed() {
      this.$enablePageScroll();
    },
  },
};
</script>

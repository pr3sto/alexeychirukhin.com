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
        <section class="app-menu-full-section" v-if="menu.index">
          <nuxt-link
            class="app-menu-full-section-link"
            :to="menu.index.page.route"
          >
            {{ menu.index.page.displayName }}
          </nuxt-link>
        </section>
        <section
          class="app-menu-full-section"
          v-for="(section, index) of menu.sections"
          :key="index"
        >
          <p class="app-menu-full-section-header">
            {{ section.displayName }}
          </p>
          <nuxt-link
            class="app-menu-full-section-link"
            v-for="(page, index1) of section.pages"
            :key="index1"
            :to="page.route"
          >
            {{ page.displayName }}
          </nuxt-link>
        </section>
      </div>
    </transition>
  </menu>
</template>

<style lang="scss" scoped>
@use "~/assets/scss/variables" as vars;

.app-menu {
  font-family: vars.$primary-font-family;
  z-index: 0; /* creates stacking context */
}

.app-menu-header {
  display: inline-block;
  padding-left: vars.$default-padding;
  padding-right: vars.$default-padding;
  padding-top: vars.$default-padding;
  padding-bottom: calc(vars.$default-padding * 2);
  font-family: vars.$menu-header-font-family;
  font-size: vars.$appmenu-active-header-font-size;
  font-weight: bolder;
  text-shadow: var(--styles-font-shadow);
  transform: scale(1, 1.2) rotate3d(0, 1, 1, -1deg);
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
  background: var(--styles-background-color);
}

.app-menu-full-section {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: vars.$default-padding;
  padding-right: vars.$default-padding;
  padding-bottom: vars.$default-padding;
  font-size: vars.$appmenu-font-size;
}

.app-menu-full-section-header {
  padding-bottom: calc(vars.$default-padding / 2);
  font-size: vars.$appmenu-section-header-font-size;
  opacity: 0.8;
}

.app-menu-full-section-link {
  color: var(--styles-font-color);
  text-decoration: none;
}
</style>

<script>
export default {
  name: "AppMenuSm",

  computed: {
    menu() {
      return this.$services.menu.getByRoute(this.$route.path);
    },
    currentHeader() {
      return this.menu.currentHeader;
    },
  },

  data() {
    return {
      showFullscreenAppMenu: false,
    };
  },

  beforeDestroy() {
    this.$pageUtility.enablePageScroll();
  },

  methods: {
    handleAppMenuHeaderClicked() {
      this.showFullscreenAppMenu = true;
    },
    handleFullscreenAppMenuClicked() {
      this.showFullscreenAppMenu = false;
    },
    afterFullscreenAppMenuOpened() {
      this.$pageUtility.disablePageScroll();
    },
    beforeFullscreenAppMenuClosed() {
      this.$pageUtility.enablePageScroll();
    },
  },
};
</script>

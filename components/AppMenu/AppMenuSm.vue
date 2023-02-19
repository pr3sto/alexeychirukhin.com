<template>
  <menu class="app-menu">
    <p class="app-menu-header" v-on:click="handleAppMenuHeaderClicked">
      {{ activeMenuHeader }}
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
        <section class="app-menu-full-section">
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
          <div v-for="(page, index1) of section.pages" :key="index1">
            <nuxt-link class="app-menu-full-section-link" :to="page.route">
              {{ page.displayName }}
            </nuxt-link>
          </div>
        </section>
      </div>
    </transition>
  </menu>
</template>

<style lang="scss" scoped>
@use "~/assets/scss/variables" as vars;

.app-menu {
  font-family: vars.$menu-font-family;
  color: var(--styles-font-color);
  z-index: 0; /* creates stacking context */
}

.app-menu-header {
  display: inline-block;
  font-size: vars.$appmenu-font-size;
  text-shadow: var(--styles-font-shadow-long);
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
  background: var(--styles-background-color);
}

.app-menu-full-section {
  display: flex;
  flex-direction: column;
  padding-bottom: calc(vars.$default-padding * 2);
  font-size: vars.$appmenu-font-size;
}

.app-menu-full-section-header {
  padding-left: vars.$default-padding;
  padding-right: vars.$default-padding;
  font-size: vars.$appmenu-section-header-font-size;
  font-style: italic;
  opacity: 0.8;
}

.app-menu-full-section-link {
  padding-left: vars.$default-padding;
  padding-right: vars.$default-padding;
  color: var(--styles-font-color);
  text-decoration: none;
  overflow-wrap: break-word;
  box-decoration-break: clone;

  &.nuxt-link-exact-active {
    font-weight: bolder;
    text-transform: uppercase;
    text-shadow: var(--styles-font-shadow-short);
  }
}
</style>

<script>
export default {
  name: "AppMenuSm",

  computed: {
    menu() {
      return this.$services.menu.get();
    },
    activeMenuHeader() {
      return this.$services.menu.getMenuPageByRoute(this.$route.path)
        .displayName;
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
      this.$pageUtility.disablePageScroll();
    },
    beforeFullscreenAppMenuClosed() {
      this.$pageUtility.enablePageScroll();
    },
  },
};
</script>

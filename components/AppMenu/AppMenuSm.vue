<template>
  <menu class="app-menu">
    <p class="app-menu-header" v-on:click="handleAppMenuHeaderClick">
      {{ menu.currentHeader }}
    </p>
    <transition
      name="opacity-transition-03s"
      v-on:after-enter="afterFullscreenAppMenuOpened"
      v-on:before-leave="beforeFullscreenAppMenuClosed"
    >
      <div
        class="app-menu-full"
        v-show="showFullscreenAppMenu"
        v-on:click="handleFullscreenAppMenuClick"
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
  z-index: 0; /* creates stacking context */
}

.app-menu-header {
  display: inline-block;
  padding-left: vars.$general__padding--default;
  padding-right: vars.$general__padding--default;
  padding-top: vars.$general__padding--default;
  padding-bottom: calc(vars.$general__padding--default * 2);
  font-family: vars.$appmenu__header__font-family;
  font-size: vars.$appmenu__active-header__font-size--sm;
  font-weight: bolder;
  text-shadow: var(--styles-font-shadow);
  transform: scale(1, 1.2);
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
  background: var(--styles-background-color);
}

.app-menu-full-section {
  display: flex;
  flex-direction: column;
  padding-left: vars.$general__padding--default;
  padding-right: vars.$general__padding--default;
  padding-bottom: calc(vars.$general__padding--default * 2);
  font-size: vars.$appmenu__font-size--sm;
  line-height: calc(vars.$appmenu__font-size--sm * 1.1);
}

.app-menu-full-section-header {
  padding-bottom: calc(vars.$general__padding--default / 2);
  font-size: vars.$appmenu__section-header__font-size--sm;
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
  props: ["menu"],

  data() {
    return {
      showFullscreenAppMenu: false,
    };
  },

  beforeDestroy() {
    this.$pageUtility.enablePageScroll();
  },

  methods: {
    handleAppMenuHeaderClick() {
      this.showFullscreenAppMenu = true;
    },
    handleFullscreenAppMenuClick(e) {
      if (e.srcElement.classList.contains("app-menu-full")) {
        this.showFullscreenAppMenu = false;
      }
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

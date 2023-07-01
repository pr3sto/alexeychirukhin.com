<template>
  <menu class="app-menu">
    <p class="app-menu-header" v-on:click="handleAppMenuHeaderClick">
      {{ menu.currentPage.displayName }}
    </p>
    <transition
      name="opacity-transition-02s"
      v-on:before-enter="beforeFullscreenAppMenuOpened"
      v-on:before-leave="beforeFullscreenAppMenuClosed"
    >
      <div
        class="app-menu-full"
        v-if="showFullscreenAppMenu"
        v-on:click="handleFullscreenAppMenuClick"
      >
        <section class="app-menu-full-section" v-if="menu.index">
          <div>
            <nuxt-link
              class="app-menu-full-section-link"
              :to="menu.index.page.route"
            >
              {{ menu.index.page.displayName }}
            </nuxt-link>
          </div>
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

.app-menu-header {
  display: inline-block;
  padding-left: vars.$general__padding--default;
  padding-right: vars.$general__padding--default;
  padding-top: vars.$general__padding--default;
  padding-bottom: calc(vars.$general__padding--default * 2);
  font-family: vars.$appmenu__header__font-family;
  font-size: vars.$appmenu__active-header__font-size--sm;
  font-weight: bolder;
  text-shadow: var(--page-header-shadow);
  transform: scale(1, 1.2);
  cursor: pointer;
}

.app-menu-full {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: var(--page-background-color);
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
  color: var(--page-font-color);
  text-decoration: none;
  cursor: pointer;
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
    handleFullscreenAppMenuClick() {
      this.showFullscreenAppMenu = false;
    },
    beforeFullscreenAppMenuOpened() {
      this.$pageUtility.disablePageScroll();
    },
    beforeFullscreenAppMenuClosed() {
      this.$pageUtility.enablePageScroll();
    },
  },
};
</script>

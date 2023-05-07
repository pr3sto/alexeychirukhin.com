<template>
  <menu class="app-menu">
    <p class="app-menu-header">
      {{ currentHeader }}
    </p>
    <section class="app-menu-section" v-if="menu.index">
      <nuxt-link class="app-menu-section-link" :to="menu.index.page.route">
        {{ menu.index.page.displayName }}
      </nuxt-link>
    </section>
    <section
      class="app-menu-section"
      v-for="(section, index) of menu.sections"
      :key="index"
    >
      <p class="app-menu-section-header">
        {{ section.displayName }}
      </p>
      <nuxt-link
        class="app-menu-section-link"
        v-for="(page, index1) of section.pages"
        :key="index1"
        :to="page.route"
      >
        {{ page.displayName }}
      </nuxt-link>
    </section>
  </menu>
</template>

<style lang="scss" scoped>
@use "~/assets/scss/variables" as vars;

.app-menu {
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 100vh;
  font-family: vars.$primary-font-family;
  border-left: 2px solid;
  border-image: linear-gradient(
      to top,
      var(--styles-font-color) 50%,
      75%,
      transparent 90%
    )
    1;
  pointer-events: none;
}

.app-menu-header {
  position: absolute;
  top: calc(vars.$default-padding * 2);
  right: calc(vars.$default-padding * 2);
  font-family: vars.$menu-header-font-family;
  font-size: vars.$appmenu-active-header-font-size;
  font-weight: bolder;
  white-space: nowrap;
  text-shadow: var(--styles-font-shadow);
  transform: scale(1, 1.2) rotate3d(0, 1, 1, -2deg);
  pointer-events: all;
}

.app-menu-section {
  display: flex;
  flex-direction: column;
  padding-left: calc(vars.$default-padding * 2);
  padding-right: calc(vars.$default-padding * 2);
  padding-bottom: calc(vars.$default-padding * 2);
  font-size: vars.$appmenu-font-size;
  line-height: calc(vars.$appmenu-font-size * 1.1);
  border-top: 2px solid var(--styles-font-color);
}

.app-menu-section-header {
  font-size: vars.$appmenu-section-header-font-size;
  pointer-events: all;
}

.app-menu-section-link {
  color: var(--styles-font-color);
  text-decoration: none;
  pointer-events: all;
  cursor: pointer;
  opacity: 0.8;

  &:hover {
    opacity: 1;
  }
}
</style>

<script>
export default {
  name: "AppMenuLg",
  computed: {
    menu() {
      return this.$services.menu.getByRoute(this.$route.path);
    },
    currentHeader() {
      return this.menu.currentHeader;
    },
  },
};
</script>

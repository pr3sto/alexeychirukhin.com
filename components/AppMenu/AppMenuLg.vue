<template>
  <menu class="app-menu">
    <section class="app-menu-section">
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
  justify-content: center;
  height: 100vh;
  font-family: vars.$menu-font-family;
  color: var(--styles-font-color);
  pointer-events: none;
}

.app-menu-section {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-bottom: vars.$default-padding;
  font-size: vars.$appmenu-font-size;
}

.app-menu-section-header {
  padding-left: vars.$default-padding;
  padding-right: vars.$default-padding;
  font-size: vars.$appmenu-section-header-font-size;
  font-style: italic;
  pointer-events: all;
}

.app-menu-section-link {
  padding-left: vars.$default-padding;
  padding-right: vars.$default-padding;
  color: var(--styles-font-color);
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
  pointer-events: all;

  &.nuxt-link-exact-active {
    font-weight: bolder;
    text-transform: uppercase;
    text-shadow: var(--styles-font-shadow);
  }
}
</style>

<script>
export default {
  name: "AppMenuLg",
  computed: {
    menu() {
      return this.$services.menu.get();
    },
  },
};
</script>

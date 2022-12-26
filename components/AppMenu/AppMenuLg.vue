<template>
  <menu class="app-menu">
    <div>
      <section
        class="app-menu-section"
        v-for="(sectionItems, sectionName, index) of menuSections"
        :key="index"
      >
        <p class="app-menu-section-header" v-show="sectionName !== ''">
          {{ sectionName }}
        </p>
        <nuxt-link
          class="app-menu-section-link"
          v-for="(item, index1) of sectionItems"
          :key="index1"
          :to="item.route"
        >
          {{ item.header }}
        </nuxt-link>
      </section>
    </div>
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
  color: vars.$background-exclde-font-color;
  mix-blend-mode: exclusion;
  pointer-events: none;
}

.app-menu-section {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-bottom: 1rem;
  font-size: vars.$default-font-size-lg;
}

.app-menu-section-header {
  padding-left: 1rem;
  padding-right: 1rem;
  color: vars.$background-exclde-font-color;
  font-size: 0.75em;
  opacity: 0.75;
  pointer-events: all;
}

.app-menu-section-link {
  padding-left: 1rem;
  padding-right: 1rem;
  color: vars.$background-exclde-font-color;
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
  pointer-events: all;

  &.nuxt-link-exact-active {
    font-family: vars.$secondary-font-family;
    font-weight: bolder;
    text-transform: uppercase;
  }

  &:hover {
    color: vars.$background-exclde-accent-color;
  }
}
</style>

<script>
export default {
  name: "AppMenuLg",
  computed: {
    menuSections() {
      return this.$store.state.data.menuSections;
    },
  },
};
</script>

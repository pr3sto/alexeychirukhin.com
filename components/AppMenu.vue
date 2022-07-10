<template>
  <menu class="app-menu">
    <template v-if="!isSmallScreen">
      <div class="app-menu-lg">
        <section
          @mouseover="hovered = true"
          @mouseleave="hovered = false"
          class="app-menu-lg-section"
          v-for="(items, sectionName, index) of menu"
          :key="index"
        >
          <p
            class="app-menu-lg-section-header"
            :class="{ dimmed: !hovered }"
            v-show="sectionName !== ''"
          >
            {{ sectionName }}
          </p>
          <nuxt-link
            class="app-menu-lg-section-link"
            :class="{ dimmed: !hovered && !(item.route == $route.path) }"
            v-for="(item, index1) of items"
            :key="index1"
            :to="item.route"
          >
            {{ item.menuItemText }}
          </nuxt-link>
        </section>
      </div>
    </template>

    <template v-if="isSmallScreen"> </template>
  </menu>
</template>

<style scoped>
.app-menu {
}

.app-menu-lg {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-size: 2rem;
}

.app-menu-lg-section {
  display: flex;
  flex-direction: column;
  padding-bottom: 1rem;
}

.app-menu-lg-section-header {
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  color: rgba(0, 0, 0, 0.5);
  font-size: 1.5rem;
  transition: opacity 0.2s cubic-bezier(0.8, 0.2, 0.1, 0.8);
}

.app-menu-lg-section-link {
  padding-left: 1rem;
  padding-right: 1rem;
  color: rgba(0, 0, 0, 1);
  font-size: 1em;
  text-decoration: none;
  white-space: nowrap;
  transition: opacity 0.2s cubic-bezier(0.8, 0.2, 0.1, 0.8);
}

.dimmed {
  opacity: 0.2;
}
</style>

<script>
export default {
  name: "AppMenu",

  computed: {
    menu() {
      return this.$store.state.data.menu;
    },
    isSmallScreen() {
      return this.$store.state.data.isSmallScreen;
    },
  },

  data() {
    return {
      hovered: false,
    };
  },
};
</script>

<template>
  <menu class="app-menu" :style="cssVars">
    <div
      v-on:mouseenter="handleAppMenuMouseEnter"
      v-on:mouseleave="handleAppMenuMouseLeave"
      v-on:touchend="handleAppMenuTouch"
    >
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
  padding: 1rem;
}

.app-menu-section {
  display: flex;
  flex-direction: column;
  padding-bottom: 1rem;
  font-size: vars.$default-font-size-lg;
}

.app-menu-section-header {
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  color: rgba(0, 0, 0, 0.5);
  font-size: 0.75em;
  opacity: var(--app-menu-item-opacity);
  transition: opacity vars.$default-transition;
}

.app-menu-section-link {
  padding-left: 1rem;
  padding-right: 1rem;
  color: rgba(0, 0, 0, 1);
  text-decoration: none;
  white-space: nowrap;
  opacity: var(--app-menu-item-opacity);
  transition: opacity vars.$default-transition;
  cursor: pointer;
}

.app-menu-section-link.nuxt-link-exact-active {
  opacity: 1 !important;
}
</style>

<script>
export default {
  name: "AppMenuLg",

  computed: {
    cssVars() {
      return {
        "--app-menu-item-opacity": this.appMenuItemOpacity,
      };
    },
    menuSections() {
      return this.$store.state.data.menuSections;
    },
  },

  data() {
    return {
      appMenuItemOpacity: 0.2,
      touched: false,
    };
  },

  methods: {
    handleAppMenuMouseEnter() {
      if (!this.touched) this.appMenuItemOpacity = 1;
    },
    handleAppMenuMouseLeave() {
      this.appMenuItemOpacity = 0.2;
    },
    handleAppMenuTouch() {
      this.touched = true;
      setTimeout(() => (this.touched = false), 250);
    },
  },
};
</script>

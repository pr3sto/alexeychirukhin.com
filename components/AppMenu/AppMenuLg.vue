<template>
  <menu class="app-menu">
    <transition name="opacity-transition-05s">
      <div class="app-menu-overlay" v-show="loading"></div>
    </transition>
    <p
      class="app-menu-header"
      :class="{
        'app-menu-header--loading': loading,
      }"
    >
      {{ menu.currentHeader }}
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
  border-left: 2px solid var(vars.$page-styles__font-color);
  border-image: linear-gradient(
      to top,
      var(vars.$page-styles__font-color) 50%,
      75%,
      transparent 90%
    )
    1;
}

.app-menu-overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: url(/menu-overlay.jpg);
  background-size: cover;
  background-position: center;
  z-index: 1;
}

.app-menu-header {
  position: absolute;
  top: calc(vars.$general__padding--default * 2);
  right: calc(vars.$general__padding--default * 2);
  font-family: vars.$appmenu__header__font-family;
  font-size: vars.$appmenu__active-header__font-size--lg;
  font-weight: bolder;
  white-space: nowrap;
  text-shadow: var(vars.$page-styles__header__shadow);
  transform: scale(1, 1.2);
  transition: all 0.5s vars.$general__transition-func--default;
  z-index: 2;

  &--loading {
    opacity: 0.85;
    text-shadow: none;
    transform: translateX(-5vw) translateY(40vh) scale(1, 1.2);
  }
}

.app-menu-section {
  display: flex;
  flex-direction: column;
  padding-left: calc(vars.$general__padding--default * 2);
  padding-right: calc(vars.$general__padding--default * 2);
  padding-top: calc(vars.$general__padding--default / 2);
  padding-bottom: calc(vars.$general__padding--default * 2);
  font-size: vars.$appmenu__font-size--lg;
  line-height: calc(vars.$appmenu__font-size--lg * 1.1);
  border-top: 2px solid var(vars.$page-styles__font-color);
}

.app-menu-section-header {
  font-size: vars.$appmenu__section-header__font-size--lg;
  opacity: 0.8;
}

.app-menu-section-link {
  color: var(vars.$page-styles__font-color);
  text-decoration: none;
  cursor: pointer;
}
</style>

<script>
export default {
  name: "AppMenuLg",
  props: ["menu"],

  data() {
    return {
      loading: true,
    };
  },

  mounted() {
    this.lodash.delay(() => {
      this.loading = false;
    }, 1200);
  },
};
</script>

<template>
  <menu class="app-menu">
    <transition name="opacity-transition-03s">
      <div class="app-menu-overlay" v-show="loading"></div>
    </transition>
    <p
      class="app-menu-header"
      :class="{
        'app-menu-header--loading': loading,
        'app-menu-header--phase1': loadingTransitionPhase1,
        'app-menu-header--phase2': loadingTransitionPhase2,
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
  border-left: 2px solid var(--page-font-color);
  border-image: linear-gradient(
      to top,
      var(--page-font-color) 50%,
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
  background: var(--page-background-color);
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
  text-shadow: var(--page-header-shadow);
  transform: scale(1, 1.2);
  transition: transform 0.3s ease-in-out;
  z-index: 2;

  &--loading {
    transition: transform 0.7s linear, text-shadow 0.7s linear;
  }
  &--phase1 {
    text-shadow: none;
    transform: translateY(calc(50vh - vars.$general__padding--default * 2))
      scale(1, 1);
  }
  &--phase2 {
    transform: translateY(calc(50vh - vars.$general__padding--default * 2))
      scale(1, 1.2);
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
  border-top: 2px solid var(--page-font-color);
}

.app-menu-section-header {
  font-size: vars.$appmenu__section-header__font-size--lg;
  opacity: 0.8;
}

.app-menu-section-link {
  color: var(--page-font-color);
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
      loadingTransitionPhase1: true,
      loadingTransitionPhase2: false,
    };
  },

  mounted() {
    this.lodash.delay(() => {
      this.loadingTransitionPhase1 = false;
      this.loadingTransitionPhase2 = true;
      this.lodash.delay(() => {
        this.loadingTransitionPhase2 = false;
        this.loading = false;
      }, 1000);
    }, 200);
  },
};
</script>

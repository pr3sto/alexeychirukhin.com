<template>
  <menu class="app-menu">
    <p class="app-menu-header" v-on:click="handleAppMenuHeaderClicked">
      {{ currentHeader }}
    </p>
    <transition
      name="opacity-transition"
      v-on:before-enter="beforeFullscreenAppMenuOpened"
      v-on:after-leave="afterFullscreenAppMenuClosed"
    >
      <div
        class="app-menu-full"
        v-show="showFullscreenAppMenu"
        v-on:click="handleFullscreenAppMenuClicked"
      >
        <section
          class="app-menu-full-section"
          v-for="(sectionItems, sectionName, index) of menuSections"
          :key="index"
        >
          <p class="app-menu-full-section-header" v-show="sectionName !== ''">
            {{ sectionName }}
          </p>
          <div v-for="(item, index1) of sectionItems" :key="index1">
            <nuxt-link class="app-menu-full-section-link" :to="item.route">
              {{ item.header }}
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
  padding: 1rem;
  font-size: vars.$default-font-size-sm;
  text-decoration: underline;
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
  padding: 1rem;
  background: rgb(255, 255, 255);
}

.app-menu-full-section {
  display: flex;
  flex-direction: column;
  padding-bottom: 1rem;
  font-size: vars.$default-font-size-sm;
}

.app-menu-full-section-header {
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  color: rgba(0, 0, 0, 0.5);
  font-size: 0.75em;
}

.app-menu-full-section-link {
  padding-left: 1rem;
  padding-right: 1rem;
  color: rgba(0, 0, 0, 1);
  text-decoration: none;
  white-space: nowrap;
}

.app-menu-full-section-link.nuxt-link-exact-active {
  font-weight: bolder;
}

/* opacity transition */
.opacity-transition-enter-active,
.opacity-transition-leave-active {
  transition: opacity vars.$default-transition;
}
.opacity-transition-enter,
.opacity-transition-leave-to {
  opacity: 0;
}
</style>

<script>
export default {
  name: "AppMenuSm",

  computed: {
    menuSections() {
      return this.$store.state.data.menuSections;
    },
    currentHeader() {
      var menuItems = [].concat.apply([], Object.values(this.menuSections));
      return menuItems.find((item) => item.route === this.$route.path).header;
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
    beforeFullscreenAppMenuOpened() {
      // disable scroll on html when fullscreen opened
      document.body.classList.add("non-scrollable");
      document.documentElement.classList.add("non-scrollable");
    },
    afterFullscreenAppMenuClosed() {
      // enable scroll on html when fullscreen closed
      document.body.classList.remove("non-scrollable");
      document.documentElement.classList.remove("non-scrollable");
    },
  },
};
</script>

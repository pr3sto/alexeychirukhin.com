<template>
  <menu class="app-menu" :style="cssVars">
    <template v-if="!isSmallScreen">
      <div class="app-menu-lg">
        <div
          v-on:mouseenter="handleAppMenuLgMouseEnter"
          v-on:mouseleave="handleAppMenuLgMouseLeave"
          v-on:touchend="handleAppMenuLgTouchEnd"
        >
          <section
            class="app-menu-lg-section"
            v-for="(sectionItems, sectionName, index) of menuSections"
            :key="index"
          >
            <p class="app-menu-lg-section-header" v-show="sectionName !== ''">
              {{ sectionName }}
            </p>
            <nuxt-link
              class="app-menu-lg-section-link"
              v-for="(item, index1) of sectionItems"
              :key="index1"
              :to="item.route"
            >
              {{ item.menuItemText }}
            </nuxt-link>
          </section>
        </div>
      </div>
    </template>

    <template v-if="isSmallScreen">
      <div class="app-menu-sm">
        <p class="app-menu-sm-header" v-on:click="handleAppMenuSmHeaderClicked">
          {{ currentMenuItemText }}
        </p>
        <transition
          v-on:before-enter="beforeAppMenuSmFullOpened"
          v-on:after-leave="afterAppMenuSmFullClosed"
        >
          <div
            class="app-menu-sm-full"
            v-show="showFullSmMenu"
            v-on:click="handleAppMenuSmFullClicked"
          >
            <transition name="opacity-transition">
              <div v-show="showFullSmMenu">
                <section
                  class="app-menu-sm-full-section"
                  v-for="(sectionItems, sectionName, index) of menuSections"
                  :key="index"
                >
                  <p
                    class="app-menu-sm-full-section-header"
                    v-show="sectionName !== ''"
                  >
                    {{ sectionName }}
                  </p>
                  <div v-for="(item, index1) of sectionItems" :key="index1">
                    <nuxt-link
                      class="app-menu-sm-full-section-link"
                      :to="item.route"
                    >
                      {{ item.menuItemText }}
                    </nuxt-link>
                  </div>
                </section>
              </div>
            </transition>
          </div>
        </transition>
      </div>
    </template>
  </menu>
</template>

<style lang="scss" scoped>
@use "../assets/scss/variables" as vars;

.app-menu-lg {
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  padding: 1rem;
}

.app-menu-lg-section {
  display: flex;
  flex-direction: column;
  padding-bottom: 1rem;
  font-size: vars.$default-font-size-lg;
}

.app-menu-lg-section-header {
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  color: rgba(0, 0, 0, 0.5);
  font-size: 0.75em;
  opacity: var(--app-menu-item-opacity);
  transition: opacity vars.$default-transition;
}

.app-menu-lg-section-link {
  padding-left: 1rem;
  padding-right: 1rem;
  color: rgba(0, 0, 0, 1);
  text-decoration: none;
  white-space: nowrap;
  opacity: var(--app-menu-item-opacity);
  transition: opacity vars.$default-transition;
}

.app-menu-lg-section-link.nuxt-link-exact-active {
  opacity: 1 !important;
}

.app-menu-sm-header {
  padding: 1rem;
  font-size: vars.$default-font-size-sm;
  text-decoration: underline;
}

.app-menu-sm-full {
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

.app-menu-sm-full-section {
  display: flex;
  flex-direction: column;
  padding-bottom: 1rem;
  font-size: vars.$default-font-size-sm;
}

.app-menu-sm-full-section-header {
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  color: rgba(0, 0, 0, 0.5);
  font-size: 0.75em;
}

.app-menu-sm-full-section-link {
  padding-left: 1rem;
  padding-right: 1rem;
  color: rgba(0, 0, 0, 1);
  text-decoration: none;
  white-space: nowrap;
}

.app-menu-sm-full-section-link.nuxt-link-exact-active {
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
  name: "AppMenu",

  computed: {
    cssVars() {
      return {
        "--app-menu-item-opacity": this.appMenuItemOpacity,
      };
    },
    menuSections() {
      return this.$store.state.data.menuSections;
    },
    currentMenuItemText() {
      return this.$store.getters["data/currentMenuItemText"](this.$route.path);
    },
    isSmallScreen() {
      return this.$store.state.data.isSmallScreen;
    },
  },

  data() {
    return {
      appMenuItemOpacity: 0.2,
      touched: false,
      showFullSmMenu: false,
    };
  },

  methods: {
    handleAppMenuLgMouseEnter: function () {
      if (!this.touched) this.appMenuItemOpacity = 1;
    },
    handleAppMenuLgMouseLeave: function () {
      this.appMenuItemOpacity = 0.2;
    },
    handleAppMenuLgTouchEnd: function () {
      this.touched = true;
      setTimeout(() => (this.touched = false), 250);
    },
    handleAppMenuSmHeaderClicked: function () {
      this.showFullSmMenu = true;
    },
    handleAppMenuSmFullClicked: function () {
      this.showFullSmMenu = false;
    },
    beforeAppMenuSmFullOpened: function () {
      // disable scroll on html when fullscreen opened
      document.body.classList.add("non-scrollable");
      document.documentElement.classList.add("non-scrollable");
    },
    afterAppMenuSmFullClosed: function () {
      // enable scroll on html when fullscreen closed
      document.body.classList.remove("non-scrollable");
      document.documentElement.classList.remove("non-scrollable");
    },
  },
};
</script>

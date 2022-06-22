<template>
  <div class="app-menu">
    <div
      class="app-menu-section"
      v-for="(items, sectionName, index) of menu"
      :key="index"
    >
      <div class="app-menu-section-header" v-show="sectionName !== ''">
        {{ sectionName }}
      </div>
      <nuxt-link
        class="app-menu-section-link"
        v-for="(item, index1) of items"
        :key="index1"
        :to="item.route"
      >
        {{ item.menuItemText }}
      </nuxt-link>
    </div>
  </div>
</template>

<style scoped>
.app-menu {
  display: flex;
  flex-direction: column;
}
.app-menu-section {
  display: flex;
  flex-direction: column;
  padding-bottom: 0.5em;
}
.app-menu-section-header {
  padding-left: 1em;
  padding-right: 1em;
  color: rgba(0, 0, 0, 0.5);
  font-size: 0.8em;
}
.app-menu-section-link {
  padding-left: 1em;
  padding-right: 1em;
  color: rgba(0, 0, 0, 1);
  font-size: 1em;
  text-decoration: none;
  white-space: nowrap;
}
.nuxt-link-exact-active {
  font-weight: bolder;
}

@media only screen and (max-width: 700px) {
  .app-menu {
    flex-direction: row;
    flex-wrap: wrap;
  }
  .app-menu-section {
    flex-direction: row;
    flex-wrap: wrap;
    padding-bottom: 0;
  }
  .app-menu-section:not(:last-child) {
    border-right: 0.05em solid rgba(0, 0, 0, 0.15);
  }
  .app-menu-section-header {
    display: none;
  }
}
</style>

<script>
export default {
  name: "AppMenu",
  computed: {
    menu() {
      return this.$store.state.data.menu;
    },
  },
};
</script>

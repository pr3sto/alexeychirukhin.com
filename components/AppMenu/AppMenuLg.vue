<script lang="ts" setup>
import { Menu } from "~/app/types/menu";

defineProps({
  menu: {
    type: Object as PropType<Menu>,
    required: true,
  },
});

const leftPanelMinimized = ref(true);
const rightPanelMinimized = ref(false);

const onRightPanelToggleClick = () => {
  rightPanelMinimized.value = !rightPanelMinimized.value;
};
const onLeftPanelToggleClick = () => {
  leftPanelMinimized.value = !leftPanelMinimized.value;
};
</script>

<template>
  <menu class="app-menu">
    <div class="app-menu-left-panel">
      <div
        class="app-menu-panel-content app-menu-left-panel-content"
        :class="{ 'app-menu-panel-content--minimized': leftPanelMinimized }"
      >
        <div class="app-menu-left-panel-toggle">
          <p @click="onLeftPanelToggleClick">
            {{ leftPanelMinimized ? "show" : "hide" }}
          </p>
        </div>
      </div>
    </div>
    <div class="app-menu-right-panel">
      <div
        class="app-menu-panel-content app-menu-right-panel-content"
        :class="{
          'app-menu-panel-content--minimized': rightPanelMinimized,
        }"
      >
        <div class="app-menu-right-panel-toggle">
          <p @click="onRightPanelToggleClick">
            {{ rightPanelMinimized ? "show" : "hide" }}
          </p>
        </div>
        <div v-if="!rightPanelMinimized" class="app-menu-sections">
          <section v-if="menu.index" class="app-menu-section">
            <nuxt-link v-fit-text class="app-menu-section-link" to="/">
              {{ menu.index.page.displayName }}
            </nuxt-link>
          </section>
          <section
            v-for="(section, index) of menu.sections"
            :key="index"
            class="app-menu-section"
          >
            <div class="app-menu-section-header">
              <p v-fit-text>
                {{ section.displayName }}
              </p>
            </div>
            <nuxt-link
              v-for="(page, index1) of section.pages"
              :key="index1"
              v-fit-text
              class="app-menu-section-link"
              :to="`/${section.path}/${page.path}`"
            >
              {{ page.displayName }}
            </nuxt-link>
          </section>
        </div>
      </div>
    </div>
  </menu>
</template>

<style lang="scss" scoped>
.app-menu {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: row;
}

.app-menu-left-panel,
.app-menu-right-panel {
  flex: 1;
}

.app-menu-panel-content {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-size: cover;
  transition: width $general__transition--02s;

  &--minimized {
    width: $appmenu__width--minimized;
  }
}

.app-menu-left-panel-content {
  background-image: url("~/assets/images/menu-bkg-left.jpg");
  background-position: right;
  border-right: 2px solid $general__color--black;
  float: left;
}

.app-menu-right-panel-content {
  background-image: url("~/assets/images/menu-bkg-right.jpg");
  background-position: left;
  border-left: 2px solid $general__color--black;
  float: right;
}

.app-menu-right-panel-toggle,
.app-menu-left-panel-toggle {
  color: $general__color--white;
  cursor: pointer;
}

.app-menu-sections {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  max-width: 70%;
  padding: $general__padding--default;
}

.app-menu-section {
  display: flex;
  flex-direction: column;
  font-family: $appmenu__font-family;
}

.app-menu-section-header {
  max-width: 50%;
  color: $general__color--white;
}

.app-menu-section-link {
  color: $general__color--white;
  text-decoration: none;
  cursor: pointer;
}
</style>

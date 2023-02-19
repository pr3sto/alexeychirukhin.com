<template>
  <main class="page-content" :class="{ 'page-content--fit-screen': fitScreen }">
    <section
      class="page-content-component"
      v-for="(component, index) of components"
      :key="index"
      :class="{
        'page-content-component--padding-top': component.style.padding.top,
        'page-content-component--padding-bottom':
          component.style.padding.bottom,
        'page-content-component--padding-left': component.style.padding.left,
        'page-content-component--padding-right': component.style.padding.right,
        'page-content-component--grow': component.style.growToFitScreen,
      }"
    >
      <card-stack-lg
        v-if="component.content.type === 'CardStack' && !smallScreen"
        :content="component.content"
      />
      <card-stack-sm
        v-else-if="component.content.type === 'CardStack' && smallScreen"
        :content="component.content"
      />
      <photo
        v-else-if="component.content.type === 'Photo'"
        :content="component.content"
      />
      <photo-grid
        v-else-if="component.content.type === 'PhotoGrid'"
        :content="component.content"
      />
      <text-blocks
        v-else-if="component.content.type === 'TextBlocks'"
        :content="component.content"
      />
    </section>
  </main>
</template>

<style lang="scss" scoped>
@use "~/assets/scss/variables" as vars;

.page-content {
  display: flex;
  flex-direction: column;

  &--fit-screen {
    height: 100vh;
  }
}

.page-content-component {
  display: flex;

  &--padding-top {
    padding-top: vars.$default-padding;
  }
  &--padding-bottom {
    padding-bottom: vars.$default-padding;
  }
  &--padding-left {
    padding-left: vars.$default-padding;
  }
  &--padding-right {
    padding-right: vars.$default-padding;
  }
  &--grow {
    overflow: hidden;
    flex: 1;
  }

  & > * {
    flex: 1;
  }
}
</style>

<script>
import CardStackLg from "./CardStack/CardStackLg.vue";
import CardStackSm from "./CardStack/CardStackSm.vue";
import Photo from "./Photo/Photo.vue";
import PhotoGrid from "./Photo/PhotoGrid.vue";
import TextBlocks from "./TextBlocks/TextBlocks.vue";

export default {
  name: "PageContentBuilder",
  props: ["components", "fitScreen"],
  components: { CardStackLg, CardStackSm, Photo, PhotoGrid, TextBlocks },
  computed: {
    smallScreen() {
      return this.$services.settings.isSmallScreen();
    },
  },
};
</script>

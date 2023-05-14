<template>
  <main class="page-content">
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
        'page-content-component--fill-avaliable-space':
          component.style.fillAvaliableSpace,
      }"
    >
      <card-stack
        v-if="component.content.type === 'CardStack'"
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
}

.page-content-component {
  display: flex;

  &--padding-top {
    padding-top: vars.$general__padding--default;
  }
  &--padding-bottom {
    padding-bottom: vars.$general__padding--default;
  }
  &--padding-left {
    padding-left: vars.$general__padding--default;
  }
  &--padding-right {
    padding-right: vars.$general__padding--default;
  }
  &--fill-avaliable-space {
    overflow: hidden;
    flex: 1;
  }

  & > * {
    flex: 1;
  }
}
</style>

<script>
import CardStack from "./CardStack/CardStack.vue";
import Photo from "./Photo/Photo.vue";
import PhotoGrid from "./Photo/PhotoGrid.vue";
import TextBlocks from "./TextBlocks/TextBlocks.vue";

export default {
  name: "PageContentBuilder",
  props: ["components"],
  components: { CardStack, Photo, PhotoGrid, TextBlocks },
};
</script>

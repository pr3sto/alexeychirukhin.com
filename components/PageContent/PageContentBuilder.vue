<template>
  <main class="page-content">
    <section
      class="page-content-component"
      v-for="(component, index) of components"
      :key="index"
      :style="component.style.css"
      :class="{
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

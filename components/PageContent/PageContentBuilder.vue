<template>
  <main class="page-content">
    <section
      class="page-content-component"
      v-for="(component, index) of components"
      :key="index"
      :class="{
        'page-content-component--padding-top': component.padding.top,
        'page-content-component--padding-bottom': component.padding.bottom,
        'page-content-component--padding-left': component.padding.left,
        'page-content-component--padding-right': component.padding.right,
      }"
    >
      <text-blocks
        v-if="component.content.type === 'TextBlocks'"
        :content="component.content"
      />
      <card-stack-sm
        v-else-if="component.content.type === 'CardStack' && smallScreen"
        :content="component.content"
      />
      <card-stack-lg
        v-else-if="component.content.type === 'CardStack' && !smallScreen"
        :content="component.content"
      />
      <photo-grid
        v-else-if="component.content.type === 'PhotoGrid'"
        :content="component.content"
      />
    </section>
  </main>
</template>

<style lang="scss" scoped>
.page-content {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.page-content-component {
  display: flex;

  &--padding-top {
    padding-top: 1rem;
  }
  &--padding-bottom {
    padding-bottom: 1rem;
  }
  &--padding-left {
    padding-left: 1rem;
  }
  &--padding-right {
    padding-right: 1rem;
  }

  &:only-child {
    flex-grow: 1;
  }

  & > * {
    flex-grow: 1;
  }
}
</style>

<script>
import CardStackLg from "./CardStack/CardStackLg.vue";
import CardStackSm from "./CardStack/CardStackSm.vue";
import PhotoGrid from "./PhotoGrid/PhotoGrid.vue";
import TextBlocks from "./TextBlocks/TextBlocks.vue";

export default {
  name: "PageContentBuilder",
  props: ["components"],
  components: { CardStackLg, CardStackSm, PhotoGrid, TextBlocks },
  computed: {
    smallScreen() {
      return this.$store.state.settings.isSmallScreen;
    },
  },
};
</script>

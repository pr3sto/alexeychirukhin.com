<template>
  <main class="content">
    <section
      class="content-component"
      v-for="(component, index) of components"
      :key="index"
      :class="{
        'content-component--padding-top': component.padding.top,
        'content-component--padding-bottom': component.padding.bottom,
        'content-component--padding-left': component.padding.left,
        'content-component--padding-right': component.padding.right,
        }"
    >
      <text-content
        v-if="component.content.type === 'TextContent'"
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
.content {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.content-component {
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
import CardStackLg from "~/components/Content/CardStack/CardStackLg.vue";
import CardStackSm from "~/components/Content/CardStack/CardStackSm.vue";
import PhotoGrid from "~/components/Content/PhotoGrid/PhotoGrid.vue";
import TextContent from "~/components/Content/Text/TextContent.vue";

export default {
  name: "ContentBuilder",
  props: ["components"],
  components: { CardStackLg, CardStackSm, PhotoGrid, TextContent },
  computed: {
    smallScreen() {
      return this.$store.state.settings.isSmallScreen;
    },
  },
};
</script>

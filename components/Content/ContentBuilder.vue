<template>
  <main class="content">
    <section
      class="content-block"
      v-for="(block, index) of content.blocks"
      :key="index"
    >
      <text-content v-if="block.type === 'TextContent'" :text="block.text" />
      <card-stack-sm
        v-else-if="block.type === 'CardStack' && smallScreen"
        :cards="block.cards"
      />
      <card-stack-lg
        v-else-if="block.type === 'CardStack' && !smallScreen"
        :cards="block.cards"
      />
      <photo-grid
        v-else-if="block.type === 'PhotoGrid'"
        :photos="block.photos"
        :cols="block.cols"
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

.content-block {
  display: flex;
  padding-bottom: 1rem;

  &:last-child {
    padding-bottom: 0;
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
  props: ["content"],
  components: { CardStackLg, CardStackSm, PhotoGrid, TextContent },
  computed: {
    smallScreen() {
      return this.$store.state.settings.isSmallScreen;
    },
  },
};
</script>

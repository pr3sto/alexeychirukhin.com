<template>
  <main class="content">
    <aside
      v-show="content.floatingText"
      class="content-floating-text"
      :class="
        smallScreen ? 'content-floating-text--sm' : 'content-floating-text--lg'
      "
    >
      <p>{{ content.floatingText }}</p>
    </aside>
    <div class="content-container">
      <section
        class="content-container-block"
        v-for="(block, index) of content.blocks"
        :key="index"
      >
        <text-content v-if="block.type === 'TextContent'" :text="block.text" />
        <card-stack
          v-else-if="block.type === 'CardStack'"
          :cards="block.cards"
        />
        <photo-grid
          v-else-if="block.type === 'PhotoGrid'"
          :photos="block.photos"
          :cols="block.cols"
        />
      </section>
    </div>
  </main>
</template>

<style lang="scss" scoped>
@use "~/assets/scss/variables" as vars;

.content {
  display: flex;
}

.content-floating-text {
  position: fixed;
  left: 0;
  padding: 1rem;
  color: white;
  mix-blend-mode: exclusion;

  &--lg {
    top: 0;
    bottom: 0;
    font-size: vars.$default-font-size-lg;
    writing-mode: vertical-lr;
    text-align: center;
  }
  &--sm {
    bottom: 0;
    font-size: vars.$default-font-size-sm;
    writing-mode: initial;
  }
}

.content-container {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.content-container-block {
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
import CardStack from "~/components/Content/CardStack/CardStack.vue";
import PhotoGrid from "~/components/Content/PhotoGrid/PhotoGrid.vue";
import TextContent from "~/components/Content/Text/TextContent.vue";

export default {
  name: "ContentBuilder",
  props: ["content"],
  components: { CardStack, PhotoGrid, TextContent },
  computed: {
    smallScreen() {
      return this.$store.state.settings.isSmallScreen;
    },
  },
};
</script>

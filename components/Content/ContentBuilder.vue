<template>
  <main
    class="content"
    :class="{
      'content--lg': !isSmallScreen,
      'content--sm': isSmallScreen,
    }"
  >
    <aside v-show="content.floatingText" class="content-floating-text">
      <p>{{ content.floatingText }}</p>
    </aside>
    <div class="content-container">
      <section
        class="content-container-block"
        v-for="(item, index) of content.blocks"
        :key="index"
      >
        <text-content v-if="item.type === 'TextContent'" :text="item.text" />
        <card-stack v-else-if="item.type === 'CardStack'" :cards="item.cards" />
        <photo-grid v-else-if="item.type === 'PhotoGrid'" :grid="item" />
      </section>
    </div>
  </main>
</template>

<style scoped>
.content {
  display: flex;
}

.content-floating-text {
  position: fixed;
  left: 0;
  padding: 1em;
  color: white;
  mix-blend-mode: exclusion;
}
.content--lg .content-floating-text {
  top: 0;
  bottom: 0;
  writing-mode: vertical-lr;
  text-align: center;
}
.content--sm .content-floating-text {
  bottom: 0;
  writing-mode: initial;
}
.content-floating-text > p {
  font-size: 2em;
}

.content-container {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.content-container-block {
  display: flex;
  padding-bottom: 1em;
}
.content-container-block:last-child {
  padding-bottom: 0;
}
.content-container-block:only-child {
  flex-grow: 1;
}
.content-container-block > * {
  flex-grow: 1;
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
    isSmallScreen() {
      return this.$store.state.data.isSmallScreen;
    },
  },
};
</script>

<template>
  <main class="content-container">
    <section
      class="content-block"
      v-for="(item, index) of content"
      :key="index"
    >
      <text-content v-if="item.type === 'TextContent'" :text="item.text" />
      <card-stack v-else-if="item.type === 'CardStack'" :cards="item.cards" />
      <photo-grid v-else-if="item.type === 'PhotoGrid'" :grid="item" />
    </section>
  </main>
</template>

<style scoped>
.content-container {
  display: flex;
  flex-direction: column;
}
.content-block {
  display: flex;
  padding-bottom: 1em;
}
.content-block:last-child {
  padding-bottom: 0;
}
.content-block:only-child {
  flex-grow: 1;
}
.content-block > * {
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
};
</script>

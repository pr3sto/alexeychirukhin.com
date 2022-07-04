<template>
  <main class="content">
    <floating-text class="content-floating-text" />
    <div class="content-container">
      <section
        class="content-block"
        v-for="(item, index) of content"
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
  top: 0;
  padding: 1em;
  writing-mode: vertical-lr;
}
.content-container {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
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

@media only screen and (max-width: 700px) {
  .content-floating-text {
    top: auto;
    bottom: 0;
    writing-mode: initial;
  }
}
</style>

<script>
import FloatingText from "~/components/FloatingText";
import CardStack from "~/components/Content/CardStack/CardStack.vue";
import PhotoGrid from "~/components/Content/PhotoGrid/PhotoGrid.vue";
import TextContent from "~/components/Content/Text/TextContent.vue";

export default {
  name: "ContentBuilder",
  props: ["content"],
  components: { FloatingText, CardStack, PhotoGrid, TextContent },
};
</script>

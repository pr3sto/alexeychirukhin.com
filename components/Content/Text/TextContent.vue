<template>
  <div class="textcontent">
    <p>{{ content.text }}</p>
  </div>
</template>

<style scoped>
.textcontent {
  text-align: center;
}
</style>

<script>
export default {
  name: "TextContent",
  props: ["content"],
};
</script>

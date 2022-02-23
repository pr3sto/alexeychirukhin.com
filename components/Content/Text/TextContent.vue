<template>
  <div class="textcontent">
    {{ text }}
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
  props: ["text"],
};
</script>

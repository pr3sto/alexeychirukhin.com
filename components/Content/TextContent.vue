<template>
  <div class="textcontent">
    {{ text }}
  </div>
</template>

<style>
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

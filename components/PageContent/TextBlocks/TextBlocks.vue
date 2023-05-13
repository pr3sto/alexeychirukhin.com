<template>
  <div class="textblocks">
    <div
      class="textblocks-block"
      v-for="(block, index1) of content.blocks"
      :key="index1"
      :class="`textblocks-block--align-${block.align}`"
    >
      <component
        v-for="(line, index2) of block.lines"
        :key="index2"
        :is="line.trim() === '' ? 'br' : 'p'"
        :style="block.linesStyle"
      >
        {{ line }}
      </component>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "~/assets/scss/variables" as vars;

.textblocks {
  display: flex;
  flex-direction: column;
}

.textblocks-block {
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  &--align-left {
    align-self: flex-start;
  }
  &--align-right {
    align-self: flex-end;
  }
  &--align-center {
    align-self: center;
  }
}

br {
  display: block;
  margin-top: 1em;
  content: "";
}
</style>

<script>
export default {
  name: "TextBlocks",
  props: ["content"],
};
</script>

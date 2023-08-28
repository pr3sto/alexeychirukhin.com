<script lang="ts" setup>
import * as PageTypes from "~/app/types/page";

defineProps({
  content: {
    type: Object as PropType<PageTypes.TextBlocks>,
    required: true,
  },
});
</script>

<template>
  <div class="textblocks">
    <div
      v-for="(block, index1) of content.blocks"
      :key="index1"
      class="textblocks-block"
      :class="`textblocks-block--align-${block.align}`"
    >
      <component
        :is="line.trim() === '' ? 'br' : 'p'"
        v-for="(line, index2) of block.lines"
        :key="index2"
        :style="block.linesStyle"
      >
        {{ line }}
      </component>
    </div>
  </div>
</template>

<style lang="scss" scoped>
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

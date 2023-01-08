<template>
  <div
    class="textblocks"
    :class="smallScreen ? 'textblocks--sm' : 'textblocks--lg'"
  >
    <div
      class="textblocks-block"
      v-for="(block, index1) of content.blocks"
      :key="index1"
      :class="`textblocks-block--align-${block.align}`"
      :style="block.linesStyle"
    >
      <component
        v-for="(line, index2) of block.lines"
        :key="index2"
        :is="line.trim() === '' ? 'br' : 'p'"
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

  &--lg {
    font-size: vars.$textblocks-font-size-lg;
  }

  &--sm {
    font-size: vars.$textblocks-font-size-sm;
  }
}

.textblocks-block {
  display: flex;
  flex-direction: column;

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
  content: "";
  margin-top: 1em;
}
</style>

<script>
export default {
  name: "TextBlocks",
  props: ["content"],

  computed: {
    smallScreen() {
      return this.$store.state.settings.isSmallScreen;
    },
  },
};
</script>

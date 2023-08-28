<script lang="ts" setup>
import { PageComponent } from "~/app/types/page";
import PageService from "~/app/services/PageService";

const props = defineProps({
  pageId: {
    type: Number,
    required: true,
  },
});

// state
const config = useRuntimeConfig();
const styles = useCustomStyles();

const { data, error } = await useAsyncData(`page${props.pageId}`, async () => {
  const pageData = await PageService.getAsync(
    config.public.PAGE_API_URL,
    props.pageId,
  );

  // apply page styles
  styles.setPageBackgroundColor(pageData.styles.backgroundColor);
  styles.setPageFontColor(pageData.styles.fontColor);

  return pageData;
});

if (error.value) {
  throw createError({ statusCode: 500, fatal: true });
}

// methods
const composeCSS = (component: PageComponent): string => {
  let css =
    `padding: ${component.styles.offset.top}` +
    ` ${component.styles.offset.right}` +
    ` ${component.styles.offset.bottom}` +
    ` ${component.styles.offset.left};`;

  if (component.styles.maxHeight) {
    css += `max-height: ${component.styles.maxHeight};`;
  }
  return css;
};

// dynamic components
const CardStack = resolveComponent("CardStack");
const TextBlocks = resolveComponent("TextBlocks");
const PhotoBlock = resolveComponent("PhotoBlock");
const resolveComponentByType = (typeName: string): Object | string => {
  switch (typeName) {
    case "CardStack":
      return CardStack;
    case "TextBlocks":
      return TextBlocks;
    case "Photo":
      return PhotoBlock;
    default:
      return "div";
  }
};
</script>

<template>
  <main v-if="data" class="page-content">
    <section
      v-for="(component, index) of data.components"
      :key="index"
      class="page-content-section"
      :style="composeCSS(component)"
    >
      <component
        :is="resolveComponentByType(component.content.type)"
        :content="component.content"
        class="page-content-component"
      />
    </section>
  </main>
</template>

<style lang="scss" scoped>
.page-content {
  background: var($page-styles__background-color);
  color: var($page-styles__font-color);
}
</style>

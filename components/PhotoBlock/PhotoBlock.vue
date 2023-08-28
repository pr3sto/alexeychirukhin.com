<script lang="ts" setup>
import { Photo } from "~/app/types/page";

const props = defineProps({
  content: {
    type: Object as PropType<Photo>,
    required: true,
  },
});

const config = useRuntimeConfig();

let elementResizeObserver: ResizeObserver | null;

// html elements
const root = ref<HTMLElement>();

// state
const width = ref(0);
const height = ref(0);
const elementPadding = ref(0);
const aspectRatio = computed(() => props.content.width / props.content.height);

// methods
const recalculatePhotoDimensions = () => {
  if (!root.value) return;

  if (root.value.offsetWidth) {
    width.value = root.value.offsetWidth - elementPadding.value * 2;
    height.value = width.value / aspectRatio.value;
  }
};

// events
onMounted(() => {
  if (root.value) {
    elementPadding.value = parseFloat(getComputedStyle(root.value).padding);
    elementResizeObserver = new ResizeObserver(
      useThrottle(recalculatePhotoDimensions, 50),
    );
    elementResizeObserver.observe(root.value);
  }
});

onUnmounted(() => {
  if (elementResizeObserver) {
    elementResizeObserver.disconnect();
    elementResizeObserver = null;
  }
});
</script>

<template>
  <div ref="root" class="photoblock">
    <div class="photoblock-container">
      <nuxt-img
        class="photoblock-container-img"
        :provider="config.public.NUXT_IMG_PROVIDER"
        :width="width"
        :height="height"
        preset="progressivejpg"
        sizes="md:800px lg:1500px"
        loading="lazy"
        :src="content.url"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.photoblock-container {
  position: relative;

  /* image placeholder */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: var($page-styles__font-color);
    opacity: 0.1;
  }
}

.photoblock-container-img {
  position: relative;
  display: block;
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  cursor: pointer;
}
</style>

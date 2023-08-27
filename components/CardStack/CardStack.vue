<script lang="ts" setup>
import { CardStack } from "~/app/types/page";

defineProps({
  content: {
    type: Object as PropType<CardStack>,
    required: true,
  },
});

const { isMobileScreen } = useScreenDetection();
</script>

<template>
  <CardStackSm v-if="isMobileScreen" :content="content" />
  <CardStackLg v-else :content="content" />
</template>

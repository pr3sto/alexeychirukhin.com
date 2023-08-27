<script lang="ts" setup>
import { CardStack } from "~/app/types/page";

defineProps({
  content: {
    type: Object as PropType<CardStack>,
    required: true,
  },
});
</script>

<template>
  <span>{{ content }}</span>
</template>

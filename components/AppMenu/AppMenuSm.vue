<script lang="ts" setup>
import { Menu } from "~/app/types/menu";

defineProps({
  menu: {
    type: Object as PropType<Menu>,
    required: true,
  },
});
</script>

<template>
  <span>{{ menu }}</span>
</template>

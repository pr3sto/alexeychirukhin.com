<script lang="ts" setup>
import { Menu } from "~/app/types/menu";

defineProps({
  menu: {
    type: Object as PropType<Menu>,
    required: true,
  },
});

const { isMobileScreen } = useScreenDetection();
</script>

<template>
  <AppMenuSm v-if="isMobileScreen" :menu="menu" />
  <AppMenuLg v-else :menu="menu" />
</template>

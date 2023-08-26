<script lang="ts" setup>
import { useMenuStore } from "~/stores/menu";

const menuStore = useMenuStore();
const menuPage = menuStore.indexMenuPage;

if (!menuPage) {
  throw createError({ statusCode: 404, fatal: true });
}
</script>

<template>
  <div v-if="menuPage">
    <ContentBuilder :page-id="menuPage.id" />
  </div>
</template>

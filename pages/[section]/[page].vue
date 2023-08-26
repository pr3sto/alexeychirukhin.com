<script lang="ts" setup>
import { useMenuStore } from "~/stores/menu";

const route = useRoute();
const menuStore = useMenuStore();

const menuPage = menuStore.getSectionMenuPage(
  route.params.section as string,
  route.params.page as string,
);

if (!menuPage) {
  throw createError({ statusCode: 404, fatal: true });
}

useHead({
  title: menuPage?.displayName,
});
</script>

<template>
  <div v-if="menuPage">
    <ContentBuilder :page-id="menuPage.id" />
  </div>
</template>

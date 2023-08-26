<script lang="ts" setup>
import { useMenuStore } from "~/stores/menu";

const route = useRoute();
const menuStore = useMenuStore();

const menuPage = menuStore.getSectionMenuPage(
  route.params.section as string,
  route.params.page as string,
);

if (!menuPage) {
  throw showError({ statusCode: 404, statusMessage: "Page Not Found" });
}

useHead({
  title: menuPage.displayName,
});
</script>

<template>
  <div>
    <ContentBuilder :page-id="menuPage.id" />
  </div>
</template>

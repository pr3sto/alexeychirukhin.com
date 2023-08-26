<script lang="ts" setup>
import { useMenuStore } from "~/stores/menu";

const menuStore = useMenuStore();
const menuPage = menuStore.indexMenuPage;

if (!menuPage) {
  throw showError({ statusCode: 404, statusMessage: "Page Not Found" });
}
</script>

<template>
  <div>
    <ContentBuilder :page-id="menuPage.id" />
  </div>
</template>

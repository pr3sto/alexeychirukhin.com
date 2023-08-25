<script lang="ts" setup>
import { useMenuStore } from "~/stores/menu";
import MenuService from "~/app/services/MenuService";

useHead({
  title: "Alexey Chirukhin",
  titleTemplate(title) {
    return title && title !== "Alexey Chirukhin"
      ? `${title} — Alexey Chirukhin`
      : "Alexey Chirukhin";
  },
});

const config = useRuntimeConfig();
const menuStore = useMenuStore();

const { pending, data } = await useLazyAsyncData("menu", async () => {
  const menuData = await MenuService.getAsync(config.public.MENU_API_URL);
  menuStore.setData(menuData);
  return menuData;
});
</script>

<template>
  <div>
    <LoadingOverlay v-if="pending" />
    <div v-if="data">
      <AppMenu :menu="data" class="menu" />
      <NuxtPage class="page" />
    </div>
  </div>
</template>

<style lang="scss">
.menu {
  z-index: 1;
}

.page {
  padding: 0 $appmenu__width--minimized;
}
</style>

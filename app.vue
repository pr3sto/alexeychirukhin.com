<script lang="ts" setup>
import { useMenuStore } from "~/stores/menu";
import MenuService from "~/app/services/MenuService";

const config = useRuntimeConfig();
const menuStore = useMenuStore();

useHead({
  title: config.public.HEAD_TITLE,
  titleTemplate(title) {
    return title && title !== config.public.HEAD_TITLE
      ? `${title} — ${config.public.HEAD_TITLE}`
      : config.public.HEAD_TITLE;
  },
});

const { pending, data, error } = await useLazyAsyncData("menu", async () => {
  const menuData = await MenuService.getAsync(config.public.MENU_API_URL);
  menuStore.setData(menuData);
  return menuData;
});

watch(error, (value) => {
  if (value) {
    throw createError({ statusCode: 500, fatal: true });
  }
});
</script>

<template>
  <div>
    <LoadingOverlay v-if="pending" />
    <div v-if="data">
      <AppMenu :menu="data" class="menu" />
      <NuxtPage class="main-page" />
    </div>
  </div>
</template>

<style lang="scss">
.menu {
  z-index: 1;
}

.main-page {
  padding: 0 $appmenu__width--minimized;
}
</style>

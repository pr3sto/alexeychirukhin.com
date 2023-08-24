<script lang="ts" setup>
import MenuService from "./app/services/MenuService";

const config = useRuntimeConfig();

const { pending, data } = await useLazyAsyncData("users", async () => {
  return await MenuService.getAsync(config.public.MENU_API_URL);
});
</script>

<template>
  <div>
    <div v-if="pending">
      <h1>LOADING</h1>
    </div>
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

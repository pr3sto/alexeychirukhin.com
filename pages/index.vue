<script lang="ts" setup>
import { useMenuStore } from "~/stores/menu";
import PageService from "~/app/services/PageService";

const config = useRuntimeConfig();
const menuStore = useMenuStore();

const menuPage = menuStore.indexMenuPage;

if (!menuPage) {
  throw createError({ statusCode: 404, statusMessage: "Page Not Found" });
}

const { pending, data } = await useLazyAsyncData(
  `page${menuPage.id}`,
  async () => {
    const pageData = await PageService.getAsync(
      config.public.PAGE_API_URL,
      menuPage.id,
    );
    return pageData;
  },
);
</script>

<template>
  <div>
    <span>{{ data }}</span>
  </div>
</template>

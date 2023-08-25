<script lang="ts" setup>
import { useMenuStore } from "~/stores/menu";
import PageService from "~/app/services/PageService";

const route = useRoute();
const config = useRuntimeConfig();
const menuStore = useMenuStore();

const menuPage = menuStore.getSectionMenuPage(
  route.params.section as string,
  route.params.page as string,
);

if (!menuPage) {
  throw createError({ statusCode: 404, statusMessage: "Page Not Found" });
}

useHead({
  title: menuPage?.displayName,
});

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

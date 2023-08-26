<script lang="ts" setup>
import PageService from "~/app/services/PageService";

const props = defineProps({
  pageId: {
    type: Number,
    required: true,
  },
});

const config = useRuntimeConfig();

const { pending, data } = await useLazyAsyncData(
  `page${props.pageId}`,
  async () => {
    const pageData = await PageService.getAsync(
      config.public.PAGE_API_URL,
      props.pageId,
    );
    return pageData;
  },
);
</script>

<template>
  <main class="page-content">
    {{ data }}
  </main>
</template>

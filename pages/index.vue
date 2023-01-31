<template>
  <page-content-builder
    :components="page && page.components"
    :settings="page && page.settings"
  />
</template>

<script>
import PageContentBuilder from "~/components/PageContent/PageContentBuilder.vue";

export default {
  components: { PageContentBuilder },
  async asyncData({ route, $services }) {
    const page = await $services.page.getAsync(route.path);
    return { page };
  },
};
</script>

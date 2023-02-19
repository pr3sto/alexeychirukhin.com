<template>
  <page-content-builder
    :components="page && page.components"
    :fitScreen="page && page.settings.fitScreen"
  />
</template>

<script>
import PageContentBuilder from "~/components/PageContent/PageContentBuilder.vue";

export default {
  components: { PageContentBuilder },
  async asyncData({ route, $services }) {
    const page = await $services.page.loadAsync(route.path);
    return { page };
  },
};
</script>

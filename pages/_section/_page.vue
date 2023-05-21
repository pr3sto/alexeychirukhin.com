<template>
  <page :data="pageData" />
</template>

<script>
import Page from "~/components/Page.vue";

export default {
  components: { Page },

  head({ $route, $services }) {
    const { displayName } = $services.menu.getMenuPageByRoute($route.path);
    return {
      title: displayName,
    };
  },

  async asyncData({ route, $services }) {
    const pageData = await $services.page.loadAsync(route.path);
    return { pageData };
  },
};
</script>

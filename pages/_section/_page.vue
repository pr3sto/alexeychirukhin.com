<template>
  <page :data="pageData" />
</template>

<script>
import Page from "~/components/Page.vue";

export default {
  components: { Page },

  head({ $route, $services }) {
    const menuPage = $services.menu.getMenuPageByRoute($route.path);
    return {
      title: menuPage && menuPage.displayName,
    };
  },

  async asyncData({ route, $services }) {
    const pageData = await $services.page.loadAsync(route.path);
    return { pageData };
  },
};
</script>

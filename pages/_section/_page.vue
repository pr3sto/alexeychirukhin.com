<template>
  <page :data="pageData" />
</template>

<script>
import Page from "~/components/Page.vue";

export default {
  components: { Page },

  head() {
    return {
      title: this.pageData && this.pageData.header,
    };
  },

  async asyncData({ route, $services }) {
    const pageData = await $services.page.loadAsync(route.path);
    return { pageData };
  },
};
</script>

<template>
  <page :data="pageData" />
</template>

<script>
import Page from "~/components/Page.vue";

export default {
  components: { Page },

  head({ $services }) {
    return {
      title: $services.appState.getCurrentPageDisplayName(),
    };
  },

  async asyncData({ $services }) {
    const pageData = await $services.appState.getCurrentPageAsync();
    return { pageData };
  },
};
</script>

<template>
  <page :data="pageData" />
</template>

<script>
import Page from "~/components/Page.vue";

export default {
  components: { Page },

  head({ $services }) {
    const { displayName } = $services.navigation.getCurrentMenuPage();
    return {
      title: displayName,
    };
  },

  async asyncData({ $services }) {
    const pageData = await $services.navigation.getCurrentPageAsync();
    return { pageData };
  },
};
</script>

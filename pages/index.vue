<template>
  <page-content-builder :components="page.components" />
</template>

<script>
import PageContentBuilder from "~/components/PageContent/PageContentBuilder.vue";

export default {
  components: { PageContentBuilder },
  computed: {
    page() {
      return this.$store.getters["data/currentPage"](this.$route.path);
    },
  },
};
</script>

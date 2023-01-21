<template>
  <page-content-builder :components="page.components" />
</template>

<script>
import PageContentBuilder from "~/components/PageContent/PageContentBuilder.vue";

export default {
  components: { PageContentBuilder },

  computed: {
    page() {
      return this.$api.page.get(this.$route.path);
    },
  },

  head() {
    return {
      title: this.page.header,
    };
  },

  validate({ params, redirect }) {
    const page = this.$api.page.get(`/${params.page}`);
    if (!page) {
      redirect("/");
    }
    return true;
  },
};
</script>

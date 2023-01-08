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

  head() {
    return {
      title: this.page.header,
    };
  },

  validate({ params, store, redirect }) {
    const page = store.getters["data/currentPage"](
      `/${params.section}/${params.page}`
    );
    if (!page) {
      redirect("/");
    }
    return true;
  },
};
</script>

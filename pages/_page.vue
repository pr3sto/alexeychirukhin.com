<template>
  <content-builder :content="page.content" />
</template>

<script>
import ContentBuilder from "~/components/Content/ContentBuilder.vue";

export default {
  components: { ContentBuilder },

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
    var page = store.getters["data/currentPage"](`/${params.page}`);
    if (!page) {
      redirect("/");
    }
    return true;
  },
};
</script>

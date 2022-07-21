<template>
  <content-builder :content="page.content" :small="small"/>
</template>

<script>
import ContentBuilder from "~/components/Content/ContentBuilder.vue";

export default {
  components: { ContentBuilder },
  props: ["small"],

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

<template>
  <content-builder :content="page.content" />
</template>

<script>
import ContentBuilder from "~/components/Content/ContentBuilder.vue";

export default {
  components: { ContentBuilder },

  head() {
    return {
      title: this.page.menuItemText,
    };
  },

  computed: {
    page() {
      return this.$store.state.data.pages.find(
        (page) => page.route === this.$route.path
      );
    },
  },

  validate({ params, store, redirect }) {
    var page = store.state.data.pages.find(
      (page) => page.route === `/${params.page}`
    );
    if (!page) {
      redirect("/");
    }
    return true;
  },
};
</script>

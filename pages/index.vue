<template>
  <content-builder :components="page.components" />
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
};
</script>

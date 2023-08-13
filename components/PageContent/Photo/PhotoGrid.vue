<template>
  <div class="photogrid" :class="{ 'photogrid--padding': content.padding }">
    <masonry
      v-for="(section, index) of content.sections"
      :key="index"
      :cols="useMobileVersion ? section.cols.sm : section.cols.lg"
    >
      <photo
        class="photogrid-photo"
        :class="{ 'photogrid-photo--padding': section.padding }"
        v-for="(photo, index1) of section.photos"
        :key="index1"
        :content="photo"
      />
    </masonry>
  </div>
</template>

<style lang="scss" scoped>
@use "~/assets/scss/variables" as vars;

.photogrid {
  &--padding {
    margin: -(vars.$general__padding--default);
    padding: calc(vars.$general__padding--default / 2);

    .photogrid-photo {
      padding: calc(vars.$general__padding--default / 2);
    }

    .photogrid-photo-caption {
      padding: calc(
        vars.$general__padding--default + vars.$general__padding--default / 2
      );
    }
  }
}
</style>

<script>
import Photo from "./Photo.vue";

export default {
  name: "PhotoGrid",
  props: ["content"],
  components: { Photo },

  computed: {
    useMobileVersion() {
      return this.$services.settings.getUseMobileVersion();
    },
  },
};
</script>

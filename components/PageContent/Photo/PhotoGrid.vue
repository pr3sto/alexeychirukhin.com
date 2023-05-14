<template>
  <div class="photogrid" :class="{ 'photogrid--padding': content.padding }">
    <masonry :cols="content.cols">
      <photo
        class="photogrid-photo"
        :class="{ 'photogrid-photo--padding': content.padding }"
        v-for="(photo, index) of content.photos"
        :key="index"
        :content="photo"
      ></photo>
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
      padding: calc(vars.$general__padding--default + vars.$general__padding--default / 2);
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
};
</script>

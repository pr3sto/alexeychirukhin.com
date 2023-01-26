<template>
  <div class="photogrid" :class="{ 'photogrid--padding': content.padding }">
    <masonry :cols="content.cols">
      <photo
        class="photogrid-photo"
        :class="{ 'photogrid-photo--padding': content.padding }"
        v-for="(photo, index) of content.photos"
        :key="index"
        :photo="photo"
      ></photo>
    </masonry>
  </div>
</template>

<style lang="scss" scoped>
@use "~/assets/scss/variables" as vars;

.photogrid {
  &--padding {
    margin: -(vars.$default-padding);
    padding: calc(vars.$default-padding / 2);

    .photogrid-photo {
      padding: calc(vars.$default-padding / 2);
    }

    .photogrid-photo-caption {
      padding: calc(vars.$default-padding + vars.$default-padding / 2);
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

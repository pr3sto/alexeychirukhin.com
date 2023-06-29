<template>
  <div class="photo">
    <nuxt-img
      class="photo-img"
      :class="{ 'photo-img--hidden': !useMobileVersion && !photoVisible }"
      :provider="$globalProperties.nuxtImgProvider"
      preset="progressivejpg"
      loading="lazy"
      sizes="md:800px lg:1500px"
      :src="content.url"
      v-on:click="(e) => handlePhotoImgClick(e, content.url)"
    />
    <transition name="opacity-enter-transition-02s">
      <div
        v-if="content.caption && (useMobileVersion || photoVisible)"
        class="photo-caption"
        :style="content.caption.linesStyle"
      >
        <span v-for="(line, index) in content.caption.lines" :key="index">{{
          line
        }}</span>
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
@use "~/assets/scss/variables" as vars;

.photo {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.photo-img {
  display: block;
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  cursor: pointer;

  &--hidden {
    visibility: hidden;
  }
}

.photo-caption {
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: vars.$general__padding--default;
}
</style>

<script>
import events from "~/constants/events.js";

export default {
  name: "Photo",
  props: ["content"],

  computed: {
    useMobileVersion() {
      return this.$services.settings.getUseMobileVersion();
    },
  },

  data() {
    return {
      photoVisible: true,
    };
  },

  mounted() {
    this.$root.$on(events.FULLSCREEN_CLOSED, this.showOriginalPhoto);
  },

  beforeDestroy() {
    this.$root.$off(events.FULLSCREEN_CLOSED, this.showOriginalPhoto);
  },

  methods: {
    handlePhotoImgClick(e, photoUrl) {
      this.hideOriginalPhoto();
      this.$root.$emit(events.OPEN_FULLSCREEN, e.target, photoUrl);
    },
    showOriginalPhoto() {
      this.photoVisible = true;
    },
    hideOriginalPhoto() {
      this.photoVisible = false;
    },
  },
};
</script>

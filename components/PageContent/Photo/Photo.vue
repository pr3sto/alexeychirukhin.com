<template>
  <div class="photo">
    <div class="photo-container">
      <nuxt-img
        class="photo-container-img"
        :width="width"
        :height="height"
        :provider="$globalProperties.nuxtImgProvider"
        preset="progressivejpg"
        sizes="md:800px lg:1500px"
        loading="lazy"
        :src="content.url"
        v-on:click="(e) => handlePhotoImgClick(e, content)"
      />

      <div
        v-if="content.caption"
        class="photo-container-caption"
        :style="content.caption.linesStyle"
      >
        <span v-for="(line, index) in content.caption.lines" :key="index">{{
          line
        }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "~/assets/scss/variables" as vars;

.photo {
  display: flex;
  align-items: center;
  justify-content: center;
}

.photo-container {
  position: relative;

  /* image placeholder */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: var(vars.$page-styles__font-color);
    opacity: 0.05;
  }
}

.photo-container-img {
  position: relative;
  display: block;
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  cursor: pointer;
}

.photo-container-caption {
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
      width: "auto",
      height: "auto",
      aspectRatio: this.content.width / this.content.height,
      elementPadding: 0,
      elementResizeObserver: null,
    };
  },

  mounted() {
    this.elementPadding = parseFloat(getComputedStyle(this.$el).padding);

    this.elementResizeObserver = new ResizeObserver(
      this.lodash.throttle(this.recalculatePhotoDimensions, 50)
    );
    this.elementResizeObserver.observe(this.$el);
  },

  beforeDestroy() {
    this.elementResizeObserver.disconnect();
    this.elementResizeObserver = null;
  },

  methods: {
    recalculatePhotoDimensions() {
      if (this.$el.offsetWidth) {
        this.width = this.$el.offsetWidth - this.elementPadding * 2;
        this.height = this.width / this.aspectRatio;
      }
    },
    handlePhotoImgClick(e, photo) {
      this.$root.$emit(events.OPEN_FULLSCREEN, e.target, photo);
    },
  },
};
</script>

<template>
  <div class="photo">
    <nuxt-img
      class="photo-img"
      :width="width"
      :height="height"
      :provider="$globalProperties.nuxtImgProvider"
      preset="progressivejpg"
      sizes="md:800px lg:1500px"
      loading="lazy"
      :src="content.url"
      v-on:click="(e) => handlePhotoImgClick(e, content.url)"
    />
    <div
      v-if="content.caption"
      class="photo-caption"
      :style="content.caption.linesStyle"
    >
      <span v-for="(line, index) in content.caption.lines" :key="index">{{
        line
      }}</span>
    </div>
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
    handlePhotoImgClick(e, photoUrl) {
      this.$root.$emit(events.OPEN_FULLSCREEN, e.target, photoUrl);
    },
  },
};
</script>

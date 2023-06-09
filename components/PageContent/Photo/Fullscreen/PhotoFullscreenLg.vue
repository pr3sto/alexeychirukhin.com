<template>
  <transition
    name="background-transition"
    v-on:before-enter="beforeFullscreenOpened"
    v-on:after-leave="afterFullscreenClosed"
  >
    <div class="photo-fullscreen" v-show="showFullScreen" :style="cssVars">
      <transition name="zoomimg-transform-transition">
        <zoom-img
          ref="zoomimg"
          class="photo-fullscreen-zoomimg"
          v-show="showFullScreen"
          :src="photoUrl"
          :zoomScale="zoomigProps.zoomScale"
        />
      </transition>
      <transition name="opacity-transition-02s">
        <p
          class="photo-fullscreen-close"
          v-if="showFullScreen"
          v-on:click="handleCloseButtonClick"
        >
          close
        </p>
      </transition>
      <transition name="opacity-transition-02s">
        <div class="photo-fullscreen-colorpicker" v-if="showFullScreen">
          <figure
            class="photo-fullscreen-colorpicker-block photo-fullscreen-colorpicker-block--white"
            v-on:click="handleWhiteBgClick"
            title="Light background"
          />
          <figure
            class="photo-fullscreen-colorpicker-block photo-fullscreen-colorpicker-block--black"
            v-on:click="handleBlackBgClick"
            title="Dark background"
          />
        </div>
      </transition>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
@use "~/assets/scss/variables" as vars;

.photo-fullscreen {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  color: var(--page-font-color);
  background: var(--photo-fs-bg-color);
  transition: background vars.$general__transition--02s;
  touch-action: none;
}

.photo-fullscreen-zoomimg {
  position: fixed;
  left: var(--img-left);
  top: var(--img-top);
  width: var(--img-width);
  height: var(--img-height);
  transform: translate(0px, 0px) scale(1);
}

.photo-fullscreen-close {
  position: fixed;
  top: var(--img-top);
  left: vars.$general__padding--default;
  font-size: vars.$photo__close__font-size--lg;
  line-height: vars.$photo__close__font-size--lg;
  writing-mode: vertical-rl;
  cursor: pointer;
}

.photo-fullscreen-colorpicker {
  position: fixed;
  top: var(--img-top);
  right: vars.$general__padding--default;
  display: flex;
  flex-direction: column;
}

.photo-fullscreen-colorpicker-block {
  width: vars.$general__padding--default;
  height: vars.$general__padding--default;
  cursor: pointer;

  &--white {
    background: vars.$general__color--white;
    border: 1px solid vars.$general__color--black;
  }
  &--black {
    background: vars.$general__color--black;
    border: 1px solid vars.$general__color--white;
  }
}

/* background color transition */
.background-transition-enter-active,
.background-transition-leave-active {
  transition: background vars.$general__transition--02s;
}
.background-transition-enter,
.background-transition-leave-to {
  background: rgba(0, 0, 0, 0);
}

/* zoomimg transform transition */
.zoomimg-transform-transition-enter-active,
.zoomimg-transform-transition-leave-active {
  transition: transform vars.$general__transition--02s;
}
.zoomimg-transform-transition-enter,
.zoomimg-transform-transition-leave-to {
  transform: var(--img-transform);
}
</style>

<script>
import ZoomImg from "../ZoomImg.vue";
import events from "~/constants/events.js";
import photoConstants from "~/constants/photo.js";

export default {
  name: "PhotoFullscreenLg",
  components: { ZoomImg },

  computed: {
    cssVars() {
      return {
        "--img-left": `${this.zoomigProps.left}px`,
        "--img-top": `${this.zoomigProps.top}px`,
        "--img-width": `${this.zoomigProps.width}px`,
        "--img-height": `${this.zoomigProps.height}px`,
        "--img-transform": this.zoomigProps.transform,
      };
    },
  },

  data() {
    return {
      showFullScreen: false,
      photoUrl: photoConstants.NO_IMAGE_URL,
      zoomigProps: {
        zoomScale: 1,
        left: 0,
        top: 0,
        width: 0,
        height: 0,
        transform: "none",
      },
    };
  },

  mounted() {
    this.$root.$on(events.OPEN_FULLSCREEN, this.openFullscreen);
  },

  beforeDestroy() {
    this.$root.$off(events.OPEN_FULLSCREEN, this.openFullscreen);
    this.cleanupEventListeners();
  },

  methods: {
    beforeFullscreenOpened() {
      window.addEventListener("resize", this.closeFullscreen, { once: true });
      window.addEventListener("wheel", this.handleScroll, { passive: false });
    },
    afterFullscreenClosed() {
      window.removeEventListener("resize", this.closeFullscreen);
      window.removeEventListener("wheel", this.handleScroll);
      this.$root.$emit(events.FULLSCREEN_CLOSED);
    },
    handleCloseButtonClick() {
      this.closeFullscreen();
    },
    handleScroll(e) {
      e.preventDefault();
      this.closeFullscreen();
    },
    handleWhiteBgClick() {
      this.$services.settings.photo.setWhiteFullscreenBgColor();
    },
    handleBlackBgClick() {
      this.$services.settings.photo.setBlackFullscreenBgColor();
    },
    openFullscreen(targetImg, photoUrl) {
      this.photoUrl = photoUrl;

      const initImgRect = targetImg.getBoundingClientRect();
      const imgWidth = targetImg.naturalWidth;

      // calculate scale factor (from initial to fullscreen)
      const fsImgScaleFactor = calcFsImgScaleFactor(
        initImgRect,
        document.documentElement.clientWidth,
        document.documentElement.clientHeight,
        parseFloat(getComputedStyle(document.body).fontSize)
      );

      // calculate fullscreen image position
      const fsImgRect = calcFsImgRect(
        initImgRect,
        document.documentElement.clientWidth,
        document.documentElement.clientHeight,
        fsImgScaleFactor
      );

      // calculate transform (from fullscreen to initial)
      const fsImgTransfrom = calcFsImgTransform(
        initImgRect,
        fsImgRect,
        fsImgScaleFactor
      );

      // set fullscreen zoom-img css vars
      this.zoomigProps.zoomScale = imgWidth / fsImgRect.width;
      this.zoomigProps.left = fsImgRect.x;
      this.zoomigProps.top = fsImgRect.y;
      this.zoomigProps.width = fsImgRect.width;
      this.zoomigProps.height = fsImgRect.height;
      this.zoomigProps.transform = fsImgTransfrom;

      // show fullscreen
      this.showFullScreen = true;
    },
    closeFullscreen() {
      if (this.showFullScreen) {
        if (this.$refs["zoomimg"]) {
          this.$refs["zoomimg"].zoomOut();
        }
        this.showFullScreen = false;
      }
    },
    cleanupEventListeners() {
      window.removeEventListener("resize", this.closeFullscreen);
      window.removeEventListener("wheel", this.handleScroll);
    },
  },
};

function calcFsImgScaleFactor(
  initImgRect,
  fullscreenWidth,
  fullscreenHeight,
  padding
) {
  return Math.min(
    (fullscreenWidth - padding * 6) / initImgRect.width,
    (fullscreenHeight - padding * 2) / initImgRect.height
  );
}

function calcFsImgRect(
  initImgRect,
  fullscreenWidth,
  fullscreenHeight,
  fsImgScaleFactor
) {
  return {
    x: (fullscreenWidth - fsImgScaleFactor * initImgRect.width) / 2,
    y: (fullscreenHeight - fsImgScaleFactor * initImgRect.height) / 2,
    width: initImgRect.width * fsImgScaleFactor,
    height: initImgRect.height * fsImgScaleFactor,
  };
}

function calcFsImgTransform(initImgRect, fsImgRect, fsImgScaleFactor) {
  let x, y;
  const scale = 1 / fsImgScaleFactor;

  if (scale > 1) {
    x =
      initImgRect.x -
      (fsImgRect.x - (scale * fsImgRect.width - fsImgRect.width) / 2);
    y =
      initImgRect.y -
      (fsImgRect.y - (scale * fsImgRect.height - fsImgRect.height) / 2);
  } else {
    x =
      initImgRect.x -
      (fsImgRect.x + (fsImgRect.width - scale * fsImgRect.width) / 2);
    y =
      initImgRect.y -
      (fsImgRect.y + (fsImgRect.height - scale * fsImgRect.height) / 2);
  }

  return `translate(${x}px, ${y}px) scale(${scale})`;
}
</script>

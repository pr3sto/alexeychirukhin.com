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
          :src="zoomimgProps.photoUrl"
          :width="zoomimgProps.width"
          :height="zoomimgProps.height"
        />
      </transition>
      <transition name="opacity-transition-02s">
        <div
          class="photo-fullscreen-left-panel"
          :class="{ 'photo-fullscreen-left-panel--clickable': canGoBack }"
          v-if="showFullScreen"
          v-on:click="goToPrevPhoto"
        >
          <p
            class="photo-fullscreen-close"
            v-on:click.stop="handleCloseButtonClick"
          >
            close
          </p>
        </div>
      </transition>
      <transition name="opacity-transition-02s">
        <div
          class="photo-fullscreen-right-panel"
          :class="{ 'photo-fullscreen-right-panel--clickable': canGoForward }"
          v-if="showFullScreen"
          v-on:click="goToNextPhoto"
        >
          <div class="photo-fullscreen-colorpicker">
            <figure
              class="photo-fullscreen-colorpicker-block photo-fullscreen-colorpicker-block--white"
              v-on:click.stop="handleWhiteBgClick"
              title="Light background"
            />
            <figure
              class="photo-fullscreen-colorpicker-block photo-fullscreen-colorpicker-block--black"
              v-on:click.stop="handleBlackBgClick"
              title="Dark background"
            />
          </div>
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
  background: var(vars.$page-styles__fs-bg-color);
  transition: background vars.$general__transition--02s;
  touch-action: none;
}

.photo-fullscreen-zoomimg {
  position: fixed;
  left: var(--img-left);
  top: var(--img-top);
  width: var(--img-width);
  height: var(--img-height);
}

.photo-fullscreen-left-panel {
  position: fixed;
  top: var(--img-top);
  left: 0;
  width: var(--img-left);
  height: var(--img-height);
  transition: top vars.$general__transition--02s;

  &--clickable {
    cursor: w-resize;
  }
}

.photo-fullscreen-right-panel {
  position: fixed;
  top: var(--img-top);
  right: 0;
  width: var(--img-left);
  height: var(--img-height);
  transition: top vars.$general__transition--02s;

  &--clickable {
    cursor: e-resize;
  }
}

.photo-fullscreen-close {
  float: left;
  padding-left: vars.$general__padding--default;
  font-size: vars.$photo__close__font-size--lg;
  line-height: vars.$photo__close__font-size--lg;
  writing-mode: vertical-rl;
  user-select: none;
  cursor: pointer;
}

.photo-fullscreen-colorpicker {
  float: right;
  display: flex;
  flex-direction: column;
  padding-right: vars.$general__padding--default;
}

.photo-fullscreen-colorpicker-block {
  width: vars.$photo__close__font-size--lg;
  height: vars.$photo__close__font-size--lg;
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
  transition: transform vars.$general__transition--02s,
    opacity vars.$general__transition--02s;
}
.zoomimg-transform-transition-enter,
.zoomimg-transform-transition-leave-to {
  transform: var(--img-transform);
  opacity: 0;
}
</style>

<script>
import PhotoCarousel from "./helpers/photoCarousel.js";
import ZoomImg from "../ZoomImg.vue";
import events from "~/constants/events.js";
import photoConstants from "~/constants/photo.js";

export default {
  name: "PhotoFullscreenLg",
  components: { ZoomImg },

  computed: {
    cssVars() {
      return {
        "--img-left": `${this.zoomimgProps.left}px`,
        "--img-top": `${this.zoomimgProps.top}px`,
        "--img-width": `${this.zoomimgProps.width}px`,
        "--img-height": `${this.zoomimgProps.height}px`,
        "--img-transform": this.zoomimgProps.transform,
      };
    },
  },

  data() {
    return {
      showFullScreen: false,
      canGoBack: false,
      canGoForward: false,
      photoCarousel: PhotoCarousel(),
      zoomimgProps: {
        photoUrl: photoConstants.NO_IMAGE_URL,
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
    this.$root.$on(events.CLOSE_FULLSCREEN, this.closeFullscreen);
  },

  beforeDestroy() {
    this.$root.$off(events.OPEN_FULLSCREEN, this.openFullscreen);
    this.$root.$off(events.CLOSE_FULLSCREEN, this.closeFullscreen);
    this.cleanupEventListeners();
  },

  methods: {
    beforeFullscreenOpened() {
      window.addEventListener("resize", this.closeFullscreen, { once: true });
      window.addEventListener("wheel", this.handleScroll, { passive: false });
      window.addEventListener("keyup", this.handleKeyup);
    },
    afterFullscreenClosed() {
      this.cleanupEventListeners();
      this.$root.$emit(events.FULLSCREEN_CLOSED);
    },
    handleKeyup(e) {
      if (this.$pageUtility.isEscKey(e)) {
        this.closeFullscreen();
      } else if (this.$pageUtility.isArrowLeftKey(e)) {
        this.goToPrevPhoto();
      } else if (this.$pageUtility.isArrowRightKey(e)) {
        this.goToNextPhoto();
      }
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
    handleCloseButtonClick() {
      this.closeFullscreen();
    },
    openFullscreen(initialImgElement, photo) {
      const pagePhotos = this.$services.appState.getCurrentPagePhotos();
      this.photoCarousel.setup(pagePhotos, photo);

      // transform from page photo to fullscreen photo
      this.applyInitialImgTransform(initialImgElement, photo);

      this.changePhoto(photo);
      this.showFullScreen = true;
    },
    closeFullscreen() {
      if (this.showFullScreen) {
        if (this.$refs["zoomimg"]) {
          this.$refs["zoomimg"].zoomOut(true);
        }
        this.showFullScreen = false;
      }
    },
    goToNextPhoto() {
      if (this.photoCarousel.canGoForward()) {
        const photo = this.photoCarousel.getNextPhoto();
        this.changePhoto(photo);
      }
    },
    goToPrevPhoto() {
      if (this.photoCarousel.canGoBack()) {
        const photo = this.photoCarousel.getPrevPhoto();
        this.changePhoto(photo);
      }
    },
    changePhoto(photo) {
      this.canGoBack = this.photoCarousel.canGoBack();
      this.canGoForward = this.photoCarousel.canGoForward();

      // fullscreen image rect
      const fsImgRect = calcFsImgRect(
        photo.width,
        photo.height,
        document.documentElement.clientWidth,
        document.documentElement.clientHeight,
        parseFloat(getComputedStyle(document.body).fontSize)
      );

      this.zoomimgProps.left = fsImgRect.x;
      this.zoomimgProps.top = fsImgRect.y;
      this.zoomimgProps.width = fsImgRect.width;
      this.zoomimgProps.height = fsImgRect.height;
      this.zoomimgProps.photoUrl = photo.url;
    },
    applyInitialImgTransform(initialImgElement, photo) {
      const fsImgRect = calcFsImgRect(
        photo.width,
        photo.height,
        document.documentElement.clientWidth,
        document.documentElement.clientHeight,
        parseFloat(getComputedStyle(document.body).fontSize)
      );

      const initImgRect = initialImgElement.getBoundingClientRect();
      this.zoomimgProps.transform = calcInitialImgTransform(
        initImgRect,
        fsImgRect
      );
    },
    cleanupEventListeners() {
      window.removeEventListener("resize", this.closeFullscreen);
      window.removeEventListener("wheel", this.handleScroll);
      window.removeEventListener("keyup", this.handleKeyup);
    },
  },
};

function calcFsImgRect(
  imageWidth,
  imageHeight,
  fullscreenWidth,
  fullscreenHeight,
  padding
) {
  const scale = Math.min(
    (fullscreenWidth - padding * 6) / imageWidth,
    (fullscreenHeight - padding * 2) / imageHeight
  );
  const fullscreenImageWidth = imageWidth * scale;
  const fullscreenImageHeight = imageHeight * scale;

  return {
    x: (fullscreenWidth - fullscreenImageWidth) / 2,
    y: (fullscreenHeight - fullscreenImageHeight) / 2,
    width: fullscreenImageWidth,
    height: fullscreenImageHeight,
  };
}

function calcInitialImgTransform(initImgRect, fsImgRect) {
  let x, y;

  const scale = initImgRect.width / fsImgRect.width;

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

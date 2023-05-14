<template>
  <div class="photo" :style="cssVars">
    <div class="photo-container">
      <nuxt-img
        ref="nuxtimg"
        class="photo-container-img"
        provider="imagekit"
        preset="progressivejpg"
        loading="lazy"
        sizes="md:800px lg:1500px"
        :src="content.url"
        v-on:click="handlePhotoImgClicked()"
      />
      <div
        class="photo-container-caption"
        :class="
          useMobileVersion
            ? 'photo-container-caption--sm'
            : 'photo-container-caption--lg'
        "
      >
        <span v-for="(line, index) in content.caption" :key="index">{{
          line
        }}</span>
      </div>
    </div>

    <template v-if="!useMobileVersion">
      <transition
        name="background-transition"
        v-on:before-enter="beforeFullscreenLgOpened"
        v-on:after-leave="afterFullscreenLgClosed"
      >
        <div
          class="fullscreen-lg"
          v-show="showFullScreen"
          v-on:click="handleFullscreenLgClicked"
        >
          <transition name="zoomimg-transform-transition">
            <zoom-img
              ref="zoomimg"
              class="fullscreen-lg-zoomimg"
              v-show="showFullScreen"
              :src="content.url"
              :zoomScale="zoomigProps.zoomScale"
            />
          </transition>
          <transition name="opacity-transition">
            <p
              class="fullscreen-lg-close"
              v-if="showFullScreen"
              v-on:click="handleCloseButtonClicked"
            >
              close
            </p>
          </transition>
          <transition name="opacity-transition">
            <div class="fullscreen-lg-colorpicker" v-if="showFullScreen">
              <figure
                class="fullscreen-lg-colorpicker-block fullscreen-lg-colorpicker-block--white"
                v-on:click="handleWhiteBgClicked"
              />
              <figure
                class="fullscreen-lg-colorpicker-block fullscreen-lg-colorpicker-block--black"
                v-on:click="handleBlackBgClicked"
              />
              <figure
                class="fullscreen-lg-colorpicker-block fullscreen-lg-colorpicker-block--transparent"
                v-on:click="handleTransparentBgClicked"
              />
            </div>
          </transition>
        </div>
      </transition>
    </template>

    <template v-if="useMobileVersion">
      <transition
        name="opacity-transition"
        v-on:after-enter="afterFullscreenSmOpened"
        v-on:before-leave="beforeFullscreenSmClosed"
      >
        <div class="fullscreen-sm" v-show="showFullScreen">
          <nuxt-img
            class="fullscreen-sm-img"
            v-if="showFullScreen"
            provider="imagekit"
            preset="progressivejpg"
            sizes="md:800px lg:1500px"
            :src="content.url"
          />
          <p
            class="fullscreen-sm-close"
            v-if="showFullScreen"
            v-on:click="handleCloseButtonClicked"
          >
            close
          </p>
        </div>
      </transition>
    </template>
  </div>
</template>

<style lang="scss" scoped>
@use "~/assets/scss/variables" as vars;

.photo {
  position: relative;
  display: flex;
}

.photo-container {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.photo-container-img {
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
  padding: vars.$default-padding;

  &--lg {
    font-size: vars.$photo-caption-font-size;
  }

  &--sm {
    font-size: vars.$photo-caption-font-size;
  }

  & > span {
    line-height: 0.9em;
  }
}

.fullscreen-lg {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
  background: var(--fs-bg-color);
  transition: background vars.$default-transition;
  touch-action: none;
}

.fullscreen-lg-zoomimg {
  position: fixed;
  left: var(--fs-zoomimg-left);
  top: var(--fs-zoomimg-top);
  width: var(--fs-zoomimg-width);
  height: var(--fs-zoomimg-height);
  transform: translate(0px, 0px) scale(1);
}

.fullscreen-lg-close {
  position: fixed;
  top: 0;
  left: 0;
  padding: vars.$default-padding;
  font-size: vars.$photo-close-font-size;
  writing-mode: vertical-rl;
  cursor: pointer;
}

.fullscreen-lg-colorpicker {
  position: fixed;
  top: 0;
  right: 0;
  padding: vars.$default-padding;
  display: flex;
  flex-direction: column;
}

.fullscreen-lg-colorpicker-block {
  width: vars.$default-padding;
  height: vars.$default-padding;
  cursor: pointer;

  &--white {
    background: vars.$white-color;
    border: 1px solid vars.$black-color;
  }
  &--black {
    background: vars.$black-color;
    border: 1px solid vars.$white-color;
  }
  &--transparent {
    background: url("~/assets/textures/opacity.png");
    background-size: 8px;
  }
}

.fullscreen-sm {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
  background: var(--styles-background-color);
}

.fullscreen-sm-img {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  max-width: 100%;
  max-height: 100%;
  margin: auto;
  padding: vars.$default-padding;
}

.fullscreen-sm-close {
  position: fixed;
  top: 0;
  left: 0;
  padding: vars.$default-padding;
  font-size: vars.$photo-close-font-size;
  cursor: pointer;
}

/* background color transition */
.background-transition-enter-active,
.background-transition-leave-active {
  transition: background vars.$default-transition;
}
.background-transition-enter,
.background-transition-leave-to {
  background: rgba(0, 0, 0, 0);
}

/* zoomimg transform transition */
.zoomimg-transform-transition-enter-active,
.zoomimg-transform-transition-leave-active {
  transition: transform vars.$default-transition;
}
.zoomimg-transform-transition-enter,
.zoomimg-transform-transition-leave-to {
  transform: var(--fs-zoomimg-transform);
}
</style>

<script>
import ZoomImg from "./ZoomImg.vue";

export default {
  name: "Photo",
  props: ["content"],
  components: { ZoomImg },

  computed: {
    cssVars() {
      return {
        "--fs-bg-color": `${this.settings.fullscreenBgColor}${
          this.settings.fullscreenBgTransparent ? "c8" : "ff"
        }`,
        "--fs-zoomimg-left": `${this.zoomigProps.left}px`,
        "--fs-zoomimg-top": `${this.zoomigProps.top}px`,
        "--fs-zoomimg-width": `${this.zoomigProps.width}px`,
        "--fs-zoomimg-height": `${this.zoomigProps.height}px`,
        "--fs-zoomimg-transform": this.zoomigProps.transform,
      };
    },
    settings() {
      return this.$services.settings.photoGrid.get();
    },
    useMobileVersion() {
      return this.$services.settings.getUseMobileVersion();
    },
  },

  data() {
    return {
      showFullScreen: false,
      windowScrollPosition: {},
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

  beforeDestroy() {
    this.$pageUtility.enablePageScroll();
    this.cleanupEventListeners();
  },

  methods: {
    beforeFullscreenLgOpened() {
      window.addEventListener("resize", this.closeFullscreen);
      window.addEventListener("wheel", this.handleScroll, { passive: false });
    },
    afterFullscreenLgClosed() {
      // show image on grid
      this.$refs["nuxtimg"].$el.parentNode.style.visibility = "visible";

      window.removeEventListener("resize", this.closeFullscreen);
      window.removeEventListener("wheel", this.handleScroll);
    },
    afterFullscreenSmOpened() {
      // save scroll position
      this.windowScrollPosition = {
        x: window.pageXOffset,
        y: window.pageYOffset,
      };

      this.$pageUtility.disablePageScroll();
    },
    beforeFullscreenSmClosed() {
      this.$pageUtility.enablePageScroll();

      // restore scroll position
      window.scrollTo(this.windowScrollPosition.x, this.windowScrollPosition.y);
    },
    handlePhotoImgClicked() {
      if (this.useMobileVersion) {
        this.openFullscreenSm();
      } else {
        this.openFullscreenLg();
      }
    },
    handleFullscreenLgClicked(e) {
      if (e.srcElement.classList.contains("fullscreen-lg")) {
        this.closeFullscreen();
      }
    },
    handleCloseButtonClicked() {
      this.closeFullscreen();
    },
    handleScroll(e) {
      e.preventDefault();
      this.closeFullscreen();
    },
    handleWhiteBgClicked() {
      this.$services.settings.photoGrid.setWhiteFullscreenBgColor();
    },
    handleBlackBgClicked() {
      this.$services.settings.photoGrid.setBlackFullscreenBgColor();
    },
    handleTransparentBgClicked() {
      this.$services.settings.photoGrid.switchFullscreenBgTransparency();
    },
    openFullscreenSm() {
      this.showFullScreen = true;
    },
    openFullscreenLg() {
      // get initial image dimensions
      let initImgRect = this.$refs["nuxtimg"].$el.getBoundingClientRect();

      // calculate scale factor (from initial to fullscreen)
      const fsImgScaleFactor = calcFsImgScaleFactor(
        initImgRect,
        document.documentElement.clientWidth,
        window.innerHeight,
        parseFloat(getComputedStyle(this.$el).fontSize)
      );

      // calculate fullscreen image position
      const fsImgRect = calcFsImgRect(
        initImgRect,
        document.documentElement.clientWidth,
        window.innerHeight,
        fsImgScaleFactor
      );

      // calculate transform (from fullscreen to initial)
      const fsImgTransfrom = calcFsImgTransform(
        initImgRect,
        fsImgRect,
        fsImgScaleFactor
      );

      // set fullscreen zoom-img css vars
      this.zoomigProps.zoomScale =
        this.$refs["nuxtimg"].$el.naturalWidth / fsImgRect.width;
      this.zoomigProps.left = fsImgRect.x;
      this.zoomigProps.top = fsImgRect.y;
      this.zoomigProps.width = fsImgRect.width;
      this.zoomigProps.height = fsImgRect.height;
      this.zoomigProps.transform = fsImgTransfrom;

      // hide original image on grid
      this.$refs["nuxtimg"].$el.parentNode.style.visibility = "hidden";

      // show fullscreen
      this.showFullScreen = true;
    },
    closeFullscreen() {
      if (this.$refs["zoomimg"]) {
        this.$refs["zoomimg"].zoomOut();
      }
      this.showFullScreen = false;
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
    (fullscreenWidth - padding * 2) / initImgRect.width,
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
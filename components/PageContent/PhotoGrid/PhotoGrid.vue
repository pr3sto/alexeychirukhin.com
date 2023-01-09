<template>
  <div
    class="photogrid"
    :class="{ 'photogrid--padding': content.padding }"
    :style="cssVars"
  >
    <masonry :cols="content.cols">
      <section
        class="photogrid-photo"
        :class="{ 'photogrid-photo--padding': content.padding }"
        v-for="(photo, index1) of content.photos"
        :key="index1"
      >
        <nuxt-img
          provider="imagekit"
          preset="progressivejpg"
          sizes="md:800px lg:1500px"
          :src="photo.url"
          v-on:click="handlePhotoImgClicked($event, photo)"
        />
        <div
          class="photogrid-photo-caption"
          :class="
            smallScreen
              ? 'photogrid-photo-caption--sm'
              : 'photogrid-photo-caption--lg'
          "
        >
          <span v-for="(line, index2) in photo.caption" :key="index2">{{
            line
          }}</span>
        </div>
      </section>
    </masonry>

    <template v-if="!smallScreen">
      <transition
        name="background-transition"
        v-on:before-enter="beforeFullscreenLgOpened"
        v-on:after-leave="afterFullscreenLgClosed"
      >
        <div
          class="photogrid-fullscreen-lg"
          v-show="showFullScreen"
          v-on:click="handleFullscreenLgClicked"
        >
          <transition name="zoomimg-transform-transition">
            <zoom-img
              class="photogrid-fullscreen-lg-zoomimg"
              ref="zoomimg"
              v-show="showFullScreen"
              :src="fullscreenImg.src"
              :zoomScale="zoomigProps.zoomScale"
            />
          </transition>
          <transition name="opacity-transition">
            <p
              class="photogrid-fullscreen-lg-close"
              v-if="showFullScreen"
              v-on:click="handleCloseButtonClicked"
            >
              close
            </p>
          </transition>
          <transition name="opacity-transition">
            <div
              class="photogrid-fullscreen-lg-colorpicker"
              v-if="showFullScreen"
            >
              <figure
                class="photogrid-fullscreen-lg-colorpicker-block photogrid-fullscreen-lg-colorpicker-block--white"
                v-on:click="handleWhiteBgClicked"
              />
              <figure
                class="photogrid-fullscreen-lg-colorpicker-block photogrid-fullscreen-lg-colorpicker-block--black"
                v-on:click="handleBlackBgClicked"
              />
              <figure
                class="photogrid-fullscreen-lg-colorpicker-block photogrid-fullscreen-lg-colorpicker-block--transparent"
                v-on:click="handleTransparentBgClicked"
              />
            </div>
          </transition>
        </div>
      </transition>
    </template>

    <template v-if="smallScreen">
      <transition
        name="opacity-transition"
        v-on:after-enter="afterFullscreenSmOpened"
        v-on:before-leave="beforeFullscreenSmClosed"
      >
        <div class="photogrid-fullscreen-sm" v-show="showFullScreen">
          <nuxt-img
            class="photogrid-fullscreen-sm-img"
            v-if="showFullScreen"
            provider="imagekit"
            preset="progressivejpg"
            sizes="md:800px lg:1500px"
            :src="fullscreenImg.src"
          />
          <p
            class="photogrid-fullscreen-sm-close"
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

.photogrid-photo {
  position: relative;

  & > img {
    display: block;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
}

.photogrid-photo-caption {
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: vars.$default-padding;

  &--lg {
    font-size: vars.$photogrid-caption-font-size-lg;
  }

  &--sm {
    font-size: vars.$photogrid-caption-font-size-sm;
  }

  & > span {
    background-color: vars.$accent-color;
    line-height: 0.9em;
  }
}

.photogrid-fullscreen-lg {
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

.photogrid-fullscreen-lg-zoomimg {
  position: fixed;
  left: var(--fs-zoomimg-left);
  top: var(--fs-zoomimg-top);
  width: var(--fs-zoomimg-width);
  height: var(--fs-zoomimg-height);
  transform: translate(0px, 0px) scale(1);
}

.photogrid-fullscreen-lg-close {
  position: fixed;
  top: 0;
  left: 0;
  padding: vars.$default-padding;
  font-size: vars.$photogrid-close-font-size-lg;
  color: white;
  mix-blend-mode: exclusion;
  writing-mode: vertical-rl;
  cursor: pointer;
}

.photogrid-fullscreen-lg-colorpicker {
  position: fixed;
  top: 0;
  right: 0;
  padding: vars.$default-padding;
  display: flex;
  flex-direction: column;
}

.photogrid-fullscreen-lg-colorpicker-block {
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
    background: url("/images/opacity.png");
    background-size: 8px;
  }
}

.photogrid-fullscreen-sm {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
  background: vars.$background-color;
}

.photogrid-fullscreen-sm-img {
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

.photogrid-fullscreen-sm-close {
  position: fixed;
  top: 0;
  left: 0;
  padding: vars.$default-padding;
  font-size: vars.$photogrid-close-font-size-sm;
  color: vars.$background-exclde-font-color;
  mix-blend-mode: exclusion;
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
import * as scssVars from "~/assets/scss/_variables.scss";
import ZoomImg from "./ZoomImg.vue";

export default {
  name: "PhotoGrid",
  props: ["content"],
  components: { ZoomImg },

  computed: {
    cssVars() {
      return {
        "--fs-bg-color": `#${this.settings.fullscreenBgColor}${this.settings.fullscreenBgTransparency}`,
        "--fs-zoomimg-left": `${this.zoomigProps.left}px`,
        "--fs-zoomimg-top": `${this.zoomigProps.top}px`,
        "--fs-zoomimg-width": `${this.zoomigProps.width}px`,
        "--fs-zoomimg-height": `${this.zoomigProps.height}px`,
        "--fs-zoomimg-transform": this.zoomigProps.transform,
      };
    },
    settings() {
      return this.$store.state.settings.photogrid;
    },
    smallScreen() {
      return this.$store.state.settings.isSmallScreen;
    },
  },

  data() {
    return {
      showFullScreen: false,
      windowScrollPosition: {},
      fullscreenImg: {
        targetElement: null,
        src: this.$store.state.data.misc.noImageUrl,
      },
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
    this.$enablePageScroll();
    this.cleanupEventListeners();
  },

  methods: {
    beforeFullscreenLgOpened() {
      window.addEventListener("resize", this.closeFullscreen);
      window.addEventListener("wheel", this.handleScroll, { passive: false });
    },
    afterFullscreenLgClosed() {
      // show image on grid
      this.fullscreenImg.targetElement.parentNode.style.visibility = "visible";

      window.removeEventListener("resize", this.closeFullscreen);
      window.removeEventListener("wheel", this.handleScroll);
    },
    afterFullscreenSmOpened() {
      // save scroll position
      this.windowScrollPosition = {
        x: window.pageXOffset,
        y: window.pageYOffset,
      };

      this.$disablePageScroll();
    },
    beforeFullscreenSmClosed() {
      this.$enablePageScroll();

      // restore scroll position
      window.scrollTo(this.windowScrollPosition.x, this.windowScrollPosition.y);
    },
    handlePhotoImgClicked(e, photo) {
      this.fullscreenImg.targetElement = e.target;
      this.fullscreenImg.src = photo.url;

      if (this.smallScreen) {
        this.openFullscreenSm();
      } else {
        this.openFullscreenLg();
      }
    },
    handleFullscreenLgClicked(e) {
      if (e.srcElement.classList.contains("photogrid-fullscreen-lg")) {
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
      this.$store.commit(
        "settings/setPhotogridFullscreenBgColor",
        scssVars.whiteColor.replace("#", "")
      );
    },
    handleBlackBgClicked() {
      this.$store.commit(
        "settings/setPhotogridFullscreenBgColor",
        scssVars.blackColor.replace("#", "")
      );
    },
    handleTransparentBgClicked() {
      this.$store.commit(
        "settings/setPhotogridFullscreenBgTransparency",
        this.settings.fullscreenBgTransparency === "ff" ? "e6" : "ff"
      );
    },
    openFullscreenSm() {
      this.showFullScreen = true;
    },
    openFullscreenLg() {
      // get initial image dimensions
      let initImgRect =
        this.fullscreenImg.targetElement.getBoundingClientRect();

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
        this.fullscreenImg.targetElement.naturalWidth / fsImgRect.width;
      this.zoomigProps.left = fsImgRect.x;
      this.zoomigProps.top = fsImgRect.y;
      this.zoomigProps.width = fsImgRect.width;
      this.zoomigProps.height = fsImgRect.height;
      this.zoomigProps.transform = fsImgTransfrom;

      // hide original image on grid
      this.fullscreenImg.targetElement.parentNode.style.visibility = "hidden";

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

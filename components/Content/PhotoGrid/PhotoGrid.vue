<template>
  <div class="photogrid" :style="cssVars">
    <masonry :cols="cols">
      <section
        class="photogrid-block crosses-border"
        v-for="(photo, index) of photos"
        :key="index"
      >
        <nuxt-img
          provider="imagekit"
          preset="progressivejpg"
          sizes="md:800px lg:1500px"
          :src="photo.url"
          v-on:click="handlePhotoImgClicked($event, photo)"
        />
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
            <ZoomImg
              class="photogrid-fullscreen-lg-zoomimg"
              v-show="showFullScreen"
              :visible="showFullScreen"
              :src="fullscreenImgSrc"
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
              <div
                class="
                  photogrid-fullscreen-lg-colorpicker-block
                  photogrid-fullscreen-lg-colorpicker-block--white
                "
                v-on:click="handleWhiteBgClicked"
              />
              <div
                class="
                  photogrid-fullscreen-lg-colorpicker-block
                  photogrid-fullscreen-lg-colorpicker-block--black
                "
                v-on:click="handleBlackBgClicked"
              />
              <div
                class="
                  photogrid-fullscreen-lg-colorpicker-block
                  photogrid-fullscreen-lg-colorpicker-block--transparent
                "
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
            :src="fullscreenImgSrc"
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
  padding: 0.5rem;
  margin: -1rem;
}

.photogrid-block > img {
  display: block;
  padding: 0.5rem;
  width: 100%;
  height: 100%;
  cursor: pointer;
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
  padding: 1rem;
  font-size: vars.$default-font-size-lg;
  color: white;
  writing-mode: vertical-rl;
  mix-blend-mode: exclusion;
  cursor: pointer;
}

.photogrid-fullscreen-lg-colorpicker {
  position: fixed;
  top: 0;
  right: 0;
  padding: 1rem;
  display: flex;
  flex-direction: column;
}
.photogrid-fullscreen-lg-colorpicker-block {
  width: 1rem;
  height: 1rem;
  cursor: pointer;

  &--white {
    background: white;
    border: 1px solid black;
  }
  &--black {
    background: black;
    border: 1px solid white;
  }
  &--transparent {
    background: url("/images/opacity.png");
    background-size: 0.5rem;
  }
}

.photogrid-fullscreen-sm {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
  background: rgb(255, 255, 255);
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
  padding: 1rem;
}

.photogrid-fullscreen-sm-close {
  position: fixed;
  top: 0;
  left: 0;
  padding: 1rem;
  font-size: vars.$default-font-size-sm;
  color: white;
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

/* opacity transition */
.opacity-transition-enter-active,
.opacity-transition-leave-active {
  transition: opacity vars.$default-transition;
}
.opacity-transition-enter,
.opacity-transition-leave-to {
  opacity: 0;
}

/* border */
.crosses-border {
  --w: 7px;
  --p: 0.1rem;
  --c: rgba(0, 0, 0, 0.15);

  background: linear-gradient(
        180deg,
        rgba(0, 0, 0, 0) calc(50%),
        var(--c) calc(50%),
        rgba(0, 0, 0, 0) calc(50% + 1px)
      )
      var(--p) var(--p),
    linear-gradient(
        90deg,
        rgba(0, 0, 0, 0) calc(50%),
        var(--c) calc(50%),
        rgba(0, 0, 0, 0) calc(50% + 1px)
      )
      var(--p) var(--p),
    linear-gradient(
        180deg,
        rgba(0, 0, 0, 0) calc(50%),
        var(--c) calc(50%),
        rgba(0, 0, 0, 0) calc(50% + 1px)
      )
      calc(100% - var(--p)) calc(100% - var(--p)),
    linear-gradient(
        90deg,
        rgba(0, 0, 0, 0) calc(50%),
        var(--c) calc(50%),
        rgba(0, 0, 0, 0) calc(50% + 1px)
      )
      calc(100% - var(--p)) calc(100% - var(--p)),
    linear-gradient(
        180deg,
        rgba(0, 0, 0, 0) calc(50%),
        var(--c) calc(50%),
        rgba(0, 0, 0, 0) calc(50% + 1px)
      )
      var(--p) calc(100% - var(--p)),
    linear-gradient(
        90deg,
        rgba(0, 0, 0, 0) calc(50%),
        var(--c) calc(50%),
        rgba(0, 0, 0, 0) calc(50% + 1px)
      )
      var(--p) calc(100% - var(--p)),
    linear-gradient(
        180deg,
        rgba(0, 0, 0, 0) calc(50%),
        var(--c) calc(50%),
        rgba(0, 0, 0, 0) calc(50% + 1px)
      )
      calc(100% - var(--p)) var(--p),
    linear-gradient(
        90deg,
        rgba(0, 0, 0, 0) calc(50%),
        var(--c) calc(50%),
        rgba(0, 0, 0, 0) calc(50% + 1px)
      )
      calc(100% - var(--p)) var(--p);
  background-size: var(--w) var(--w);
  background-repeat: no-repeat;
}
</style>

<script>
import ZoomImg from "./ZoomImg.vue";

export default {
  name: "PhotoGrid",
  props: ["photos", "cols"],
  components: { ZoomImg },

  computed: {
    cssVars() {
      return {
        "--fs-bg-color": `rgba(${this.settings.fullscreenBgColor}, ${this.settings.fullscreenBgTransparency})`,
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
      fullscreenImgSrc: this.$store.state.data.misc.noImageUrl,
      zoomigProps: {
        zoomScale: 0,
        left: 0,
        top: 0,
        width: 0,
        height: 0,
        transform: "none",
      },
    };
  },

  beforeDestroy() {
    this.afterFullscreenLgClosed();
    this.beforeFullscreenSmClosed();
  },

  methods: {
    beforeFullscreenLgOpened() {
      window.addEventListener("resize", this.closeFullscreenPhoto);
      window.addEventListener("wheel", this.handleScroll, { passive: false });
    },
    afterFullscreenLgClosed() {
      window.removeEventListener("resize", this.closeFullscreenPhoto);
      window.removeEventListener("wheel", this.handleScroll);
    },
    afterFullscreenSmOpened() {
      // save scroll position
      this.windowScrollPosition = {
        x: window.pageXOffset,
        y: window.pageYOffset,
      };
      // disable scroll on html when fullscreen opened
      document.body.classList.add("non-scrollable");
      document.documentElement.classList.add("non-scrollable");
    },
    beforeFullscreenSmClosed() {
      // enable scroll on html when fullscreen closed
      document.body.classList.remove("non-scrollable");
      document.documentElement.classList.remove("non-scrollable");
      // restore scroll position
      window.scrollTo(this.windowScrollPosition.x, this.windowScrollPosition.y);
    },
    handlePhotoImgClicked(e, photo) {
      this.fullscreenImgSrc = photo.url;

      if (this.small) {
        this.showFullScreen = true;
      } else {
        this.openFullscreenZoomig(e.target);
      }
    },
    handleFullscreenLgClicked(e) {
      if (e.srcElement.classList.contains("photogrid-fullscreen-lg")) {
        this.closeFullscreenPhoto();
      }
    },
    handleCloseButtonClicked() {
      this.closeFullscreenPhoto();
    },
    handleScroll(e) {
      e.preventDefault();
      this.closeFullscreenPhoto();
    },
    handleWhiteBgClicked() {
      this.$store.commit(
        "settings/setPhotogridFullscreenBgColor",
        "255,255,255"
      );
    },
    handleBlackBgClicked() {
      this.$store.commit("settings/setPhotogridFullscreenBgColor", "0,0,0");
    },
    handleTransparentBgClicked() {
      this.$store.commit(
        "settings/setPhotogridFullscreenBgTransparency",
        this.settings.fullscreenBgTransparency == 1 ? 0.9 : 1
      );
    },
    openFullscreenZoomig(imgElement) {
      // get initial image dimensions (without padding)
      var initImgRect = imgElement.getBoundingClientRect();
      var initImgRectPadding = parseFloat(
        getComputedStyle(imgElement).fontSize
      );
      initImgRect.height = initImgRect.height - initImgRectPadding;
      initImgRect.width = initImgRect.width - initImgRectPadding;
      initImgRect.x = initImgRect.x + initImgRectPadding / 2;
      initImgRect.y = initImgRect.y + initImgRectPadding / 2;

      // calculate scale factor (from initial to fullscreen)
      var fsImgScaleFactor = calcFsImgScaleFactor(
        initImgRect,
        document.documentElement.clientWidth,
        window.innerHeight,
        parseFloat(getComputedStyle(this.$el).fontSize)
      );

      // calculate fullscreen image position
      var fsImgRect = calcFsImgRect(
        initImgRect,
        document.documentElement.clientWidth,
        window.innerHeight,
        fsImgScaleFactor
      );

      // calculate transform (from fullscreen to initial)
      var fsImgTransfrom = calcFsImgTransform(
        initImgRect,
        fsImgRect,
        fsImgScaleFactor
      );

      // set fullscreen zoomimg css vars
      this.zoomigProps.zoomScale = imgElement.naturalWidth / fsImgRect.width;
      this.zoomigProps.left = fsImgRect.x;
      this.zoomigProps.top = fsImgRect.y;
      this.zoomigProps.width = fsImgRect.width;
      this.zoomigProps.height = fsImgRect.height;
      this.zoomigProps.transform = fsImgTransfrom;

      // show fullscreen
      this.showFullScreen = true;
    },
    closeFullscreenPhoto() {
      // prevent multiple events triggering this function
      if (!this.showFullScreen) {
        return;
      }

      // hide fullscreen
      this.showFullScreen = false;
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
  var x, y;
  var scale = 1 / fsImgScaleFactor;

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

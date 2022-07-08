<template>
  <div class="photogrid" :style="cssVars">
    <masonry :cols="grid.cols">
      <section
        class="photogrid-block crosses-border"
        v-for="(photo, index) of grid.photos"
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

    <template v-if="!isSmallScreen">
      <transition
        name="background-transition"
        v-on:before-enter="beforeFullscreenOpened"
        v-on:after-leave="afterFullscreenClosed"
      >
        <div
          class="photogrid-fullscreen"
          v-show="showFullScreen"
          v-on:click="handleFullscreenClicked"
        >
          <transition name="transform-transition">
            <ZoomImg
              class="photogrid-fullscreen-zoomimg"
              v-show="showFullScreen"
              :visible="showFullScreen"
              :src="fsImgSrc"
              :zoomScale="fsImgZoomScale"
            />
          </transition>
          <transition name="opacity-transition">
            <p
              class="photogrid-fullscreen-close"
              v-show="showFullScreen"
              v-on:click="handleCloseButtonClicked"
            >
              close
            </p>
          </transition>
        </div>
      </transition>
    </template>

    <template v-if="isSmallScreen">
      <transition
        v-on:before-enter="beforeFullscreenSmallOpened"
        v-on:after-leave="afterFullscreenSmallClosed"
      >
        <div class="photogrid-small-screen-fullscreen" v-show="showFullScreen">
          <transition name="opacity-transition">
            <nuxt-img
              class="photogrid-small-screen-fullscreen-img"
              v-show="showFullScreen"
              provider="imagekit"
              preset="progressivejpg"
              sizes="md:800px lg:1500px"
              :src="fsImgSrc"
            />
          </transition>
          <transition name="opacity-transition">
            <p
              class="photogrid-small-screen-fullscreen-close"
              v-show="showFullScreen"
              v-on:click="handleCloseButtonClicked"
            >
              close
            </p>
          </transition>
        </div>
      </transition>
    </template>
  </div>
</template>

<style scoped>
.photogrid {
  padding: 0.5em;
  margin: -1em;
}

.photogrid-block > img {
  display: block;
  padding: 0.5em;
  width: 100%;
  height: 100%;
  cursor: pointer;
}

.photogrid-fullscreen {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: rgba(0, 0, 0, 0.9);
}

.photogrid-fullscreen-zoomimg {
  position: fixed;
  left: var(--fs-img-left);
  top: var(--fs-img-top);
  width: var(--fs-img-width);
  height: var(--fs-img-height);
  transform: translate(0px, 0px) scale(1);
}

.photogrid-fullscreen-close {
  position: fixed;
  top: 0;
  left: 0;
  padding: 1em;
  color: white;
  writing-mode: vertical-rl;
  mix-blend-mode: exclusion;
  cursor: pointer;
}

.photogrid-small-screen-fullscreen {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: rgb(255, 255, 255);
}

.photogrid-small-screen-fullscreen-img {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  max-width: 100%;
  max-height: 100%;
  margin: auto;
  padding: 1em;
}

.photogrid-small-screen-fullscreen-close {
  position: fixed;
  top: 0;
  left: 0;
  padding: 1em;
  color: white;
  mix-blend-mode: exclusion;
  cursor: pointer;
}

/* transition background color */
.background-transition-enter-active,
.background-transition-leave-active {
  transition: background 0.2s cubic-bezier(0.8, 0.2, 0.1, 0.8);
}
.background-transition-enter,
.background-transition-leave-to {
  background: rgba(0, 0, 0, 0);
}

/* transition transform */
.transform-transition-enter-active,
.transform-transition-leave-active {
  transition: transform 0.2s cubic-bezier(0.8, 0.2, 0.1, 0.8);
}
.transform-transition-enter,
.transform-transition-leave-to {
  transform: var(--fs-img-transform);
}

/* transition opacity */
.opacity-transition-enter-active,
.opacity-transition-leave-active {
  transition: opacity 0.2s cubic-bezier(0.8, 0.2, 0.1, 0.8);
}
.opacity-transition-enter,
.opacity-transition-leave-to {
  opacity: 0;
}

/* border */
.crosses-border {
  --w: 7px;
  --p: 0.1em;
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
  props: ["grid"],
  components: { ZoomImg },

  computed: {
    cssVars() {
      return {
        "--fs-img-left": `${this.fsImgLeft}px`,
        "--fs-img-top": `${this.fsImgTop}px`,
        "--fs-img-width": `${this.fsImgWidth}px`,
        "--fs-img-height": `${this.fsImgHeight}px`,
        "--fs-img-transform": this.fsImgTransform,
      };
    },
    isSmallScreen() {
      return this.$store.state.data.isSmallScreen;
    },
  },

  data() {
    return {
      showFullScreen: false,
      fsImgLeft: 0,
      fsImgTop: 0,
      fsImgWidth: 0,
      fsImgHeight: 0,
      fsImgTransform: "none",
      fsImgSrc: this.$store.state.data.misc.noImageUrl,
      fsImgZoomScale: 0,
    };
  },

  beforeDestroy: function () {
    this.afterFullscreenClosed();
    this.afterFullscreenSmallClosed();
  },

  methods: {
    beforeFullscreenOpened: function () {
      window.addEventListener("resize", this.closeFullscreenPhoto);
      window.addEventListener("wheel", this.handleScroll, { passive: false });
    },
    afterFullscreenClosed: function () {
      window.removeEventListener("resize", this.closeFullscreenPhoto);
      window.removeEventListener("wheel", this.handleScroll);
    },
    beforeFullscreenSmallOpened: function () {
      // disable scroll on html when fullscreen opened
      document.body.classList.add("non-scrollable");
      document.documentElement.classList.add("non-scrollable");
    },
    afterFullscreenSmallClosed: function () {
      // restore scroll on html when fullscreen closed
      document.body.classList.remove("non-scrollable");
      document.documentElement.classList.remove("non-scrollable");
    },
    handlePhotoImgClicked: function (e, photo) {
      var imgElement = e.target;
      this.openFullscreenPhoto(imgElement, photo);
    },
    handleFullscreenClicked: function (e) {
      if (e.srcElement.classList.contains("photogrid-fullscreen")) {
        this.closeFullscreenPhoto();
      }
    },
    handleCloseButtonClicked: function () {
      this.closeFullscreenPhoto();
    },
    handleScroll: function (e) {
      e.preventDefault();
      this.closeFullscreenPhoto();
    },
    openFullscreenPhoto: function (imgElement, photo) {
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
      var fsImgScaleFactor = this.calcFsImgScaleFactor(
        initImgRect,
        document.documentElement.clientWidth,
        window.innerHeight,
        parseFloat(getComputedStyle(this.$el).fontSize)
      );

      // calculate fullscreen image position
      var fsImgRect = this.calcFsImgRect(
        initImgRect,
        document.documentElement.clientWidth,
        window.innerHeight,
        fsImgScaleFactor
      );

      // calculate transform (from fullscreen to initial)
      var fsImgTransfrom = this.calcFsImgTransform(
        initImgRect,
        fsImgRect,
        fsImgScaleFactor
      );

      // set fullscreen image css vars
      this.fsImgLeft = fsImgRect.x;
      this.fsImgTop = fsImgRect.y;
      this.fsImgWidth = fsImgRect.width;
      this.fsImgHeight = fsImgRect.height;
      this.fsImgTransform = fsImgTransfrom;
      this.fsImgSrc = photo.url;
      this.fsImgZoomScale = imgElement.naturalWidth / fsImgRect.width;

      // show fullscreen
      this.showFullScreen = true;
    },
    closeFullscreenPhoto: function () {
      // prevent multiple events triggering this function
      if (!this.showFullScreen) {
        return;
      }

      // hide fullscreen
      this.showFullScreen = false;
    },
    calcFsImgScaleFactor: function (
      initImgRect,
      fullscreenWidth,
      fullscreenHeight,
      padding
    ) {
      return Math.min(
        (fullscreenWidth - padding * 2) / initImgRect.width,
        (fullscreenHeight - padding * 2) / initImgRect.height
      );
    },
    calcFsImgRect: function (
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
    },
    calcFsImgTransform: function (initImgRect, fsImgRect, fsImgScaleFactor) {
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
    },
  },
};
</script>

<template>
  <div class="photogrid" :style="cssVars">
    <masonry :cols="grid.cols">
      <div
        class="photogrid-block crosses-border"
        v-for="(photo, index) of grid.photos"
        :key="index"
      >
        <img :src="photo.url" v-on:click="openFullscreenPhoto($event, index)" />
      </div>
    </masonry>
    <transition
      name="background-transition"
      v-on:before-enter="beforeFullscreenOpened"
      v-on:after-leave="afterFullscreenClosed"
    >
      <div
        class="photogrid-fullscreen"
        v-show="showFullScreen"
        v-on:click="closeFullscreenPhoto"
      >
        <transition name="transform-transition" appear>
          <img
            class="photogrid-fullscreen-img"
            v-show="showFullScreen"
            :src="fsImgSrc"
          />
        </transition>
      </div>
    </transition>
  </div>
</template>

<style>
.photogrid {
  padding: 0.5em;
  margin: -1em;
}

.photogrid-block > img {
  display: block;
  padding: 0.5em;
  width: 100%;
  height: 100%;
  cursor: zoom-in;
}

.photogrid-fullscreen {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
  overflow: auto;
  background: rgba(0, 0, 0, 0.9);
  touch-action: pinch-zoom;
}

.photogrid-fullscreen-img {
  position: fixed;
  cursor: zoom-out;
  left: var(--fs-img-left);
  top: var(--fs-img-top);
  width: var(--fs-img-width);
  height: var(--fs-img-height);
  transform: var(--fs-img-transform);
  transform-origin: center;
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
  transform: translate(0px, 0px) scale(1);
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

@media only screen and (max-width: 700px) {
  .background-transition-enter-active,
  .background-transition-leave-active {
    transition: none !important;
  }
  .transform-transition-enter-active,
  .transform-transition-leave-active {
    transition: none !important;
  }
  .non-scrollable {
    overflow: hidden;
  }
}
</style>

<script>
export default {
  name: "PhotoGrid",
  props: ["grid"],

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
  },

  data() {
    return {
      fsImgLeft: 0,
      fsImgTop: 0,
      fsImgWidth: 0,
      fsImgHeight: 0,
      fsImgTransform: "none",
      fsImgSrc: "",
      showFullScreen: false,
    };
  },

  beforeDestroy: function () {
    this.afterFullscreenClosed();
  },

  methods: {
    beforeFullscreenOpened: function (el) {
      // close on resize/scroll
      window.addEventListener("resize", this.closeFullscreenPhoto);
      window.addEventListener("wheel", this.handleScroll, { passive: false });
      // prevent scroll when fullscreen opened
      document.body.classList.add("non-scrollable");
    },
    afterFullscreenClosed: function (el) {
      // clear events
      window.removeEventListener("resize", this.closeFullscreenPhoto);
      window.removeEventListener("wheel", this.handleScroll);
      // restore scroll
      document.body.classList.remove("non-scrollable");
    },
    openFullscreenPhoto: function (event, index) {
      // calculate transform from initial img to fullscreen
      var initImgRect = event.target.getBoundingClientRect();
      var initImgRectPadding = parseFloat(
        getComputedStyle(event.target).fontSize
      );
      initImgRect.height = initImgRect.height - initImgRectPadding;
      initImgRect.width = initImgRect.width - initImgRectPadding;
      initImgRect.x = initImgRect.x + initImgRectPadding / 2;
      initImgRect.y = initImgRect.y + initImgRectPadding / 2;

      var transfrom = this.calcTransform(
        initImgRect,
        document.documentElement.clientWidth,
        window.innerHeight,
        parseFloat(getComputedStyle(this.$el).fontSize)
      );

      // set fullscreen image css
      this.fsImgLeft = initImgRect.left;
      this.fsImgTop = initImgRect.top;
      this.fsImgWidth = initImgRect.width;
      this.fsImgHeight = initImgRect.height;
      this.fsImgSrc = this.grid.photos[index].url;
      this.fsImgTransform = transfrom;

      // show fullscreen
      this.showFullScreen = true;
    },
    closeFullscreenPhoto: async function () {
      // prevent multiple events triggering this function
      if (!this.showFullScreen) {
        return;
      }

      // hide fullscreen
      this.showFullScreen = false;
    },
    handleScroll: async function (e) {
      e.preventDefault();
      this.closeFullscreenPhoto();
    },
    calcTransform: function (
      initRect,
      fullscreenWidth,
      fullscreenHeight,
      padding
    ) {
      var scale = Math.min(
        (fullscreenWidth - padding * 2) / initRect.width,
        (fullscreenHeight - padding * 2) / initRect.height
      );

      var finalX = (fullscreenWidth - scale * initRect.width) / 2;
      var finalY = (fullscreenHeight - scale * initRect.height) / 2;

      var x, y;

      if (scale > 1) {
        x =
          finalX - (initRect.x - (scale * initRect.width - initRect.width) / 2);
        y =
          finalY -
          (initRect.y - (scale * initRect.height - initRect.height) / 2);
      } else {
        x =
          finalX - (initRect.x + (initRect.width - scale * initRect.width) / 2);
        y =
          finalY -
          (initRect.y + (initRect.height - scale * initRect.height) / 2);
      }

      return `translate(${x}px, ${y}px) scale(${scale})`;
    },
  },
};
</script>

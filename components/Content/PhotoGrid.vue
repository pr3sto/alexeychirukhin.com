<template>
  <div class="photogrid">
    <masonry :cols="grid.cols" :gutter="'1em'">
      <div
        class="photogrid-block"
        v-for="(photo, index) of grid.photos"
        :key="index"
      >
        <img :src="photo.url" v-on:click="openFullscreenPhoto($event, index)" />
      </div>
    </masonry>
    <div
      class="photogrid-fullscreen"
      :ref="'fullscreenDiv'"
      v-on:click="closeFullscreenPhoto"
    >
      <img class="photogrid-fullscreen-img" />
    </div>
  </div>
</template>

<style>
.photogrid {
  margin-bottom: -1em;
}

.photogrid-block {
  padding-bottom: 1em;
}

.photogrid-block > img {
  display: block;
  width: 100%;
  height: 100%;
  cursor: zoom-in;
}

.photogrid-fullscreen {
  position: fixed;
  display: none;
  align-items: center;
  justify-content: center;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
  overflow: auto;
  background: rgba(0, 0, 0, 0);
  transition: background 0.2s cubic-bezier(0.8, 0.2, 0.1, 0.8);
}

.photogrid-fullscreen-img {
  position: fixed;
  transform-origin: center;
  transition: transform 0.2s cubic-bezier(0.8, 0.2, 0.1, 0.8);
}

.stop-scrolling {
    overflow-y: hidden;
}
</style>

<script>
export default {
  name: "PhotoGrid",
  props: ["grid"],

  data() {
    return {
      closing: false,
    };
  },

  beforeDestroy: function () {
    if (window) {
      window.removeEventListener("resize", this.closeFullscreenPhoto);
      window.removeEventListener("wheel", this.handleScroll);
    }
  },

  methods: {
    openFullscreenPhoto: function (event, index) {
      if (window) {
        window.addEventListener("resize", this.closeFullscreenPhoto);
        window.addEventListener("wheel", this.handleScroll, { passive: false });
      }

      // get html elements
      var fullscreenDiv = this.$refs.fullscreenDiv;
      var fullscreenImg = fullscreenDiv.children[0];
      fullscreenImg.src = this.grid.photos[index].url;

      // show fullscreen div
      fullscreenDiv.style.display = "flex";

      // get initial image rect
      var initImgRect = event.target.getBoundingClientRect();

      // get fullscreen rect
      var fullscreenRect = fullscreenDiv.getBoundingClientRect();
      var fullscreenRectPadding = parseFloat(
        getComputedStyle(fullscreenDiv).fontSize
      );

      // set initial position
      fullscreenImg.style =
        `left: ${initImgRect.left}px;` +
        `top: ${initImgRect.top}px;` +
        `width: ${initImgRect.width}px;` +
        `height: ${initImgRect.height}px;`;

      // transform image from initial to fullscreen
      fullscreenImg.style.transform = this.calcTransform(
        initImgRect,
        fullscreenRect.width,
        fullscreenRect.height,
        fullscreenRectPadding
      );

      this.$refs["fullscreenDiv"].style.background = "rgba(0, 0, 0, 0.9)";
    },
    closeFullscreenPhoto: async function () {
      // prevent multiple events triggering this function
      if (this.closing || this.$refs.fullscreenDiv.style.display === "none") {
        return;
      }

      this.closing = true;

      // get html elements
      var fullscreenDiv = this.$refs.fullscreenDiv;
      var fullscreenImg = fullscreenDiv.children[0];

      // clear style
      fullscreenImg.style.transform = "translate(0px, 0px) scale(1)";
      fullscreenDiv.style.background = "rgba(0, 0, 0, 0)";

      // wait for transform animation
      const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
      await delay(220);

      // hide fullscreen div
      fullscreenDiv.style.display = "none";

      if (window) {
        window.removeEventListener("resize", this.closeFullscreenPhoto);
        window.removeEventListener("wheel", this.handleScroll);
      }

      this.closing = false;
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

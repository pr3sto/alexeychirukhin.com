<template>
  <div class="zoomimg" v-on:click="handleClick">
    <nuxt-img
      provider="imagekit"
      preset="progressivejpg"
      sizes="md:800px lg:1500px"
      :class="{
        'zoomimg-img--original': !isZoomed,
        'zoomimg-img--zoomed': isZoomed,
        'zoomimg-img--zoom-in-progress': isZoomInProgress,
      }"
      :src="src"
      :style="cssVars"
    />
  </div>
</template>

<style lang="scss" scoped>
@use "~/assets/scss/variables" as vars;

.zoomimg {
  overflow: hidden;
}

.zoomimg-img {
  &--original {
    cursor: zoom-in;
    transform: translate(0, 0) scale(var(--zoomimg-img-original-scale));
    transform-origin: left top;
  }

  &--zoomed {
    position: absolute;
    cursor: zoom-out;
    transform: translate(
        var(--zoomimg-img-zoomed-offset-x),
        var(--zoomimg-img-zoomed-offset-y)
      )
      scale(1);
    transform-origin: left top;
  }

  &--zoom-in-progress {
    transition: transform vars.$default-transition;
  }
}
</style>

<script>
export default {
  name: "ZoomImg",
  props: ["src", "zoomScale"],

  computed: {
    cssVars() {
      return {
        "--zoomimg-img-zoomed-offset-x": `${this.zoomedImgOffsetX}px`,
        "--zoomimg-img-zoomed-offset-y": `${this.zoomedImgOffsetY}px`,
        "--zoomimg-img-original-scale": 1 / this.zoomScale,
      };
    },
  },

  data() {
    return {
      isZoomed: false,
      isZoomInProgress: false,
      zoomedImgOffsetX: 0,
      zoomedImgOffsetY: 0,
      zoomedImgProps: {},
    };
  },

  beforeDestroy() {
    this.cleanupEventListeners();
  },

  methods: {
    addEventListenersForZoomedImg() {
      this.$el.addEventListener("mouseleave", this.handleMouseLeave);
      this.$el.addEventListener("mousemove", this.handleMouseMove);
      this.$el.addEventListener("touchstart", this.handleTouchStart);
      this.$el.addEventListener("touchend", this.handleTouchEnd);
    },
    removeEventListenersForZoomedImg() {
      this.$el.removeEventListener("mouseleave", this.handleMouseLeave);
      this.$el.removeEventListener("mousemove", this.handleMouseMove);
      this.$el.removeEventListener("touchstart", this.handleTouchStart);
      this.$el.removeEventListener("touchend", this.handleTouchEnd);
    },
    handleClick(e) {
      if (this.isZoomed) {
        this.zoomOut();
      } else {
        // image bounds
        this.zoomedImgProps.bounds = this.$el.getBoundingClientRect();

        // get dimensions of zoomed image
        this.zoomedImgProps.scaledDimensions = getScaledDimensions(
          this.zoomedImgProps.bounds,
          this.zoomScale
        );

        // calculate ratios for zoomed image
        this.zoomedImgProps.ratios = getRatios(
          this.zoomedImgProps.scaledDimensions,
          this.zoomedImgProps.bounds
        );

        this.zoomIn(e.clientX, e.clientY);
      }
    },
    handleMouseLeave() {
      this.zoomOut();
    },
    handleMouseMove(e) {
      let x = e.clientX - this.zoomedImgProps.bounds.left;
      let y = e.clientY - this.zoomedImgProps.bounds.top;

      x = Math.max(Math.min(x, this.zoomedImgProps.bounds.width), 0);
      y = Math.max(Math.min(y, this.zoomedImgProps.bounds.height), 0);

      this.zoomedImgOffsetX = x * -this.zoomedImgProps.ratios.x;
      this.zoomedImgOffsetY = y * -this.zoomedImgProps.ratios.y;
    },
    handleTouchStart(e) {
      this.zoomedImgProps.initialTouch = {
        zoomedImgOffsetX: this.zoomedImgOffsetX,
        zoomedImgOffsetY: this.zoomedImgOffsetY,
        x: e.changedTouches[0].clientX - this.zoomedImgProps.bounds.left,
        y: e.changedTouches[0].clientY - this.zoomedImgProps.bounds.top,
      };

      this.$el.addEventListener("touchmove", this.handleTouchMove, {
        passive: true,
      });
    },
    handleTouchEnd() {
      this.$el.removeEventListener("touchmove", this.handleTouchMove);
    },
    handleTouchMove(e) {
      const currentTouch = {
        x: e.changedTouches[0].clientX - this.zoomedImgProps.bounds.left,
        y: e.changedTouches[0].clientY - this.zoomedImgProps.bounds.top,
      };

      let x =
        this.zoomedImgProps.initialTouch.zoomedImgOffsetX +
        (currentTouch.x - this.zoomedImgProps.initialTouch.x);
      let y =
        this.zoomedImgProps.initialTouch.zoomedImgOffsetY +
        (currentTouch.y - this.zoomedImgProps.initialTouch.y);

      x = Math.max(
        Math.min(x, 0),
        (this.zoomedImgProps.scaledDimensions.width -
          this.zoomedImgProps.bounds.width) *
          -1
      );
      y = Math.max(
        Math.min(y, 0),
        (this.zoomedImgProps.scaledDimensions.height -
          this.zoomedImgProps.bounds.height) *
          -1
      );

      this.zoomedImgOffsetX = x;
      this.zoomedImgOffsetY = y;
    },
    zoomIn(clientX, clientY) {
      this.addEventListenersForZoomedImg();

      this.isZoomed = true;

      // move image under cursor (or touch)
      this.handleMouseMove({ clientX, clientY });

      // set zoom in or out in progress
      this.isZoomInProgress = true;
      setTimeout(() => {
        this.isZoomInProgress = false;
      }, 250);
    },
    zoomOut() {
      if (!this.isZoomed) {
        return;
      }

      this.removeEventListenersForZoomedImg();

      this.isZoomed = false;
      this.zoomedImgOffsetX = 0;
      this.zoomedImgOffsetY = 0;

      // set zoom in or out in progress
      this.isZoomInProgress = true;
      setTimeout(() => {
        this.isZoomInProgress = false;
      }, 250);
    },
    cleanupEventListeners() {
      this.removeEventListenersForZoomedImg();
    },
  },
};

function getScaledDimensions(imgRect, zoomScale) {
  return {
    width: imgRect.width * zoomScale,
    height: imgRect.height * zoomScale,
  };
}

function getRatios(dimensions, bounds) {
  return {
    x: (dimensions.width - bounds.width) / bounds.width,
    y: (dimensions.height - bounds.height) / bounds.height,
  };
}
</script>

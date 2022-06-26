<template>
  <div class="zoomimg" v-on:click="handleClick">
    <img
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

<style scoped>
.zoomimg {
  clip-path: inset(0 0 0 0);
}

.zoomimg-img--original {
  cursor: zoom-in;
  transform: translate(0, 0) scale(var(--zoomimg-img-scale));
  transform-origin: left top;
}

.zoomimg-img--zoomed {
  position: absolute;
  cursor: zoom-out;
  transform: translate(var(--zoomimg-img-offset-x), var(--zoomimg-img-offset-y))
    scale(1);
  transform-origin: left top;
}

.zoomimg-img--zoom-in-progress {
  transition: transform 0.2s cubic-bezier(0.8, 0.2, 0.1, 0.8);
}
</style>

<script>
export default {
  name: "ZoomImg",
  props: ["src", "zoomScale"],

  computed: {
    cssVars() {
      return {
        "--zoomimg-img-offset-x": `${this.imgOffsetX}px`,
        "--zoomimg-img-offset-y": `${this.imgOffsetY}px`,
        "--zoomimg-img-scale": 1 / this.zoomScale,
      };
    },
  },

  data() {
    return {
      isZoomed: false,
      imgOffsetX: 0,
      imgOffsetY: 0,
      imgProps: {},
      isZoomInProgress: false,
    };
  },

  beforeDestroy: function () {
    this.zoomOut();
  },

  methods: {
    handleClick(e) {
      if (this.isZoomed) {
        this.zoomOut();
      } else {
        // get dimensions of zoomed image
        var scaledDimensions = this.getScaledDimensions(
          this.$el.getBoundingClientRect(),
          this.zoomScale
        );

        this.imgProps.bounds = this.$el.getBoundingClientRect();

        // calculate ratios for zoomed image
        this.imgProps.ratios = this.getRatios(
          this.imgProps.bounds,
          scaledDimensions
        );

        this.zoomIn(e.pageX, e.pageY);
      }

      // zoom in or out in progress
      this.isZoomInProgress = true;
      setTimeout(() => {
        this.isZoomInProgress = false;
      }, 250);
    },
    handleMouseLeave(e) {
      this.zoomOut();
    },
    handleMouseMove(e) {
      if (!this.isZoomed) {
        return;
      }

      var x = e.pageX - this.imgProps.offsets.x;
      var y = e.pageY - this.imgProps.offsets.y;

      x = Math.max(Math.min(x, this.imgProps.bounds.width), 0);
      y = Math.max(Math.min(y, this.imgProps.bounds.height), 0);

      this.imgOffsetX = x * -this.imgProps.ratios.x;
      this.imgOffsetY = y * -this.imgProps.ratios.y;
    },
    zoomIn(pageX, pageY) {
      this.isZoomed = true;
      this.$el.addEventListener("mouseleave", this.handleMouseLeave);
      this.$el.addEventListener("mousemove", this.handleMouseMove);

      this.imgProps.offsets = this.getOffsets(
        window.pageXOffset,
        window.pageYOffset,
        -this.imgProps.bounds.left,
        -this.imgProps.bounds.top
      );

      this.handleMouseMove({ pageX, pageY });
    },
    zoomOut() {
      this.isZoomed = false;
      this.$el.addEventListener("mouseleave", this.handleMouseLeave);
      this.$el.addEventListener("mousemove", this.handleMouseMove);
    },
    getScaledDimensions(imgRect, zoomScale) {
      return {
        width: imgRect.width * zoomScale,
        height: imgRect.height * zoomScale,
      };
    },
    getOffsets(pageX, pageY, left, top) {
      return {
        x: pageX - left,
        y: pageY - top,
      };
    },
    getRatios(bounds, dimensions) {
      return {
        x: (dimensions.width - bounds.width) / bounds.width,
        y: (dimensions.height - bounds.height) / bounds.height,
      };
    },
  },
};
</script>

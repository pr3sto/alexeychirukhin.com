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
  props: ["src", "visible", "zoomScale"],

  watch: {
    visible: function (newVal, oldVal) {
      if (newVal == false) {
        this.zoomOut();
      }
    },
  },

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
    this.removeEventListeners();
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

        this.zoomIn(e.clientX, e.clientY);
      }
    },
    handleMouseLeave(e) {
      this.zoomOut();
    },
    handleMouseMove(e) {
      if (!this.isZoomed) {
        return;
      }

      var x = e.clientX - this.imgProps.bounds.left;
      var y = e.clientY - this.imgProps.bounds.top;

      x = Math.max(Math.min(x, this.imgProps.bounds.width), 0);
      y = Math.max(Math.min(y, this.imgProps.bounds.height), 0);

      this.imgOffsetX = x * -this.imgProps.ratios.x;
      this.imgOffsetY = y * -this.imgProps.ratios.y;
    },
    zoomIn(clientX, clientY) {
      this.isZoomed = true;
      this.addEventListeners();

      this.handleMouseMove({ clientX, clientY });

      // zoom in or out in progress
      this.isZoomInProgress = true;
      setTimeout(() => {
        this.isZoomInProgress = false;
      }, 250);
    },
    zoomOut() {
      this.isZoomed = false;
      this.removeEventListeners();

      // zoom in or out in progress
      this.isZoomInProgress = true;
      setTimeout(() => {
        this.isZoomInProgress = false;
      }, 250);
    },
    addEventListeners() {
      this.$el.addEventListener("mouseleave", this.handleMouseLeave);
      this.$el.addEventListener("mousemove", this.handleMouseMove);
    },
    removeEventListeners() {
      this.$el.removeEventListener("mouseleave", this.handleMouseLeave);
      this.$el.removeEventListener("mousemove", this.handleMouseMove);
    },
    getScaledDimensions(imgRect, zoomScale) {
      return {
        width: imgRect.width * zoomScale,
        height: imgRect.height * zoomScale,
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

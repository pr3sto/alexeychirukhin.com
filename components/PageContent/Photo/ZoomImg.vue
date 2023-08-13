<template>
  <div class="zoomimg" v-on:click="handleClick">
    <nuxt-img
      ref="image"
      class="zoomimg-img"
      :class="{
        'zoomimg-img--zoom-enabled': zoomEnabled,
        'zoomimg-img--zoomed': isZoomed,
        'zoomimg-img--zoom-in-progress': isZoomInProgress,
      }"
      :width="width"
      :height="height"
      :provider="$globalProperties.nuxtImgProvider"
      preset="progressivejpg"
      sizes="md:800px lg:1500px"
      :src="src"
      :style="cssVars"
    />
  </div>
</template>

<style lang="scss" scoped>
@use "~/assets/scss/variables" as vars;

.zoomimg-img {
  transform-origin: left top;
  transform: translate(var(--img-offset-x), var(--img-offset-y))
    scale(var(--img-scale));

  &--zoom-enabled {
    cursor: zoom-in;
  }
  &--zoomed {
    cursor: zoom-out;
  }
  &--zoom-in-progress {
    transition: transform vars.$general__transition--02s;
  }
}
</style>

<script>
export default {
  name: "ZoomImg",
  props: ["src", "width", "height"],

  computed: {
    cssVars() {
      return {
        "--img-offset-x": `${this.imgOffsetX}px`,
        "--img-offset-y": `${this.imgOffsetY}px`,
        "--img-scale": this.zoomScale,
      };
    },
  },

  data() {
    return {
      isTouch: false,
      isZoomed: false,
      isZoomInProgress: false,
      zoomEnabled: false,
      zoomScale: 1,
      imgOffsetX: 0,
      imgOffsetY: 0,
      zoomedImgProps: {},
    };
  },

  watch: {
    src() {
      this.onSrcChanged();
    },
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
    onSrcChanged() {
      this.zoomOut(false);
      this.zoomEnabled = false;

      this.$nextTick(() => {
        const img = this.getImageElement();
        const imgDimensionsAvailable = () => img.naturalWidth > 0;

        // try to get image dimensions (abort after 3s)
        this.$pageUtility.singletonPoll(imgDimensionsAvailable, 100, 30, () => {
          this.zoomEnabled = img.naturalWidth > this.width;
        });
      });
    },
    handleClick(e) {
      // additional check if zoom enabled
      this.zoomEnabled = this.getImageElement().naturalWidth > this.width;

      if (!this.zoomEnabled) {
        return;
      }

      if (this.isZoomed) {
        this.zoomOut(true);
      } else {
        this.zoomIn(e.clientX, e.clientY);
      }
    },
    handleMouseLeave() {
      this.zoomOut(true);
    },
    handleMouseMove(e) {
      if (this.isTouch) {
        // mousemove event is triggered by touch events
        // so in touch mode we don't want to handle this event
        return;
      }

      let x = e.clientX - this.zoomedImgProps.bounds.left;
      let y = e.clientY - this.zoomedImgProps.bounds.top;

      x = Math.max(Math.min(x, this.zoomedImgProps.bounds.width), 0);
      y = Math.max(Math.min(y, this.zoomedImgProps.bounds.height), 0);

      this.imgOffsetX = x * -this.zoomedImgProps.ratios.x;
      this.imgOffsetY = y * -this.zoomedImgProps.ratios.y;
    },
    handleTouchStart(e) {
      // prevent multitouch
      if (e.touches.length > 1) {
        this.handleTouchEnd();
        return;
      }

      this.isTouch = true;

      this.zoomedImgProps.initialTouch = {
        imgOffsetX: this.imgOffsetX,
        imgOffsetY: this.imgOffsetY,
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
        this.zoomedImgProps.initialTouch.imgOffsetX +
        (currentTouch.x - this.zoomedImgProps.initialTouch.x);
      let y =
        this.zoomedImgProps.initialTouch.imgOffsetY +
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

      this.imgOffsetX = x;
      this.imgOffsetY = y;
    },
    zoomIn(clientX, clientY) {
      this.addEventListenersForZoomedImg();

      this.zoomScale = Math.max(
        this.getImageElement().naturalWidth / this.width,
        1
      );
      this.isZoomed = true;

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

      // move image under cursor (or touch)
      this.handleMouseMove({ clientX, clientY });

      // set zoom in or out in progress
      this.isZoomInProgress = true;
      this.lodash.delay(() => {
        this.isZoomInProgress = false;
      }, 250);
    },
    zoomOut(withTransition) {
      if (!this.isZoomed) {
        return;
      }

      this.removeEventListenersForZoomedImg();

      this.isTouch = false;
      this.isZoomed = false;
      this.zoomScale = 1;
      this.imgOffsetX = 0;
      this.imgOffsetY = 0;
      this.zoomedImgProps = {};

      // set zoom in or out in progress
      if (withTransition) {
        this.isZoomInProgress = true;
        this.lodash.delay(() => {
          this.isZoomInProgress = false;
        }, 250);
      }
    },
    getImageElement() {
      return this.$refs["image"].$el;
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

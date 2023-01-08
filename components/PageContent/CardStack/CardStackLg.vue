<template>
  <div class="cardstack" :style="cssVars">
    <div class="cardstack-plane">
      <div
        class="cardstack-card"
        v-for="(card, index) of content.cards.slice().reverse()"
        :key="index"
        ref="cards"
        v-on:mousedown="handleCardMouseDown"
        v-on:touchstart="handleCardTouchStart"
      >
        <component :is="card.type" :card="card" :fontSize="fontSize" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "~/assets/scss/variables" as vars;

.cardstack-plane {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
  z-index: 0; /* creates stacking context for cards */
}

.cardstack-card {
  position: absolute;
  height: var(--cardstack-card-height);
  width: var(--cardstack-card-width);
  transform-origin: center;
  cursor: grab;

  &:active {
    cursor: grabbing;
  }
}
</style>

<script>
import * as cardstackConstants from "~/constants/cardstack.js";
import PhotoCard from "./PhotoCard.vue";
import DarkslideCard from "./DarkslideCard.vue";

import FastPoissonDiskSampling from "fast-2d-poisson-disk-sampling";

export default {
  name: "CardStackLg",
  props: ["content"],
  components: { PhotoCard, DarkslideCard },

  computed: {
    cssVars() {
      return {
        "--cardstack-card-height": `${this.cardstackCardHeight}px`,
        "--cardstack-card-width": `${this.cardstackCardWidth}px`,
      };
    },
  },

  data() {
    return {
      cardstackCardHeight: 0,
      cardstackCardWidth: 0,
      fontSize: 0,
      drag: {
        target: undefined,
        clientX: 0,
        clientY: 0,
      },
    };
  },

  mounted() {
    this.$nextTick(() => {
      this.reCalculate();
      this.shuffleCards();
    });

    window.addEventListener("resize", this.reCalculate);
  },

  beforeDestroy() {
    this.cleanupEventListeners();
  },

  methods: {
    reCalculate() {
      const containerRect = this.$el.getBoundingClientRect();

      // calc width and height of a card based on a container bounds
      const maxWidth =
        containerRect.width * cardstackConstants.LG_CARD_SCALE_FACTOR;
      const maxheigth =
        containerRect.height * cardstackConstants.LG_CARD_SCALE_FACTOR;
      if (maxWidth / maxheigth > cardstackConstants.CARD_ASPECT_RATIO) {
        this.cardstackCardHeight = maxheigth;
        this.cardstackCardWidth =
          maxheigth * cardstackConstants.CARD_ASPECT_RATIO;
        this.fontSize = maxheigth / cardstackConstants.FONT_SIZE_FACTOR1;
      } else {
        this.cardstackCardHeight =
          maxWidth / cardstackConstants.CARD_ASPECT_RATIO;
        this.cardstackCardWidth = maxWidth;
        this.fontSize = maxWidth / cardstackConstants.FONT_SIZE_FACTOR2;
      }
    },
    shuffleCards() {
      const containerRect = this.$el.getBoundingClientRect();
      const cardsNumber = this.$refs["cards"].length;

      // max offset for card
      const maxOffsetX = containerRect.width - this.cardstackCardWidth;
      const maxOffsetY = containerRect.height - this.cardstackCardHeight;

      // padding, because we don't want to move cards close to edges
      const paddingX =
        maxOffsetX * cardstackConstants.LG_CARD_CONTAINER_PADDING_PERCENT;
      const paddingY =
        maxOffsetY * cardstackConstants.LG_CARD_CONTAINER_PADDING_PERCENT;

      // 2d plane for random points
      const planeWidth = maxOffsetX - paddingX * 2;
      const planeHeight = maxOffsetY - paddingY * 2;

      // get random points on 2d area
      const randomPoints = getRandomPointsOnPlane(
        planeWidth,
        planeHeight,
        cardsNumber
      );

      // transform each card
      this.$refs["cards"].forEach((element, index) => {
        const x = randomPoints[index][0] + paddingX + containerRect.x;
        const y = randomPoints[index][1] + paddingY + containerRect.y;
        let rotate =
          getRandomNumber(0, cardstackConstants.LG_CARD_MAX_ANGLE_DEG) *
          (isOdd(index) ? 1 : -1);

        element.style.zIndex = index + 1;
        element.style.transform = `translateX(${x}px) translateY(${y}px) rotate(${rotate}deg)`;
      });
    },
    rearrangeCards() {
      // move current card on top
      this.$refs["cards"]
        .filter((el) => el.style.zIndex > this.drag.target.style.zIndex)
        .forEach((element) => {
          element.style.zIndex--;
        });
      this.drag.target.style.zIndex = this.$refs["cards"].length;
    },
    handleCardMouseDown(e) {
      e.stopPropagation();
      e.preventDefault();

      this.drag.clientX = e.clientX;
      this.drag.clientY = e.clientY;
      this.drag.target = e.currentTarget;

      this.rearrangeCards();

      document.addEventListener("mouseup", this.handleMouseUp);
      document.addEventListener("mousemove", this.handleMouseMove);
    },
    handleMouseUp() {
      document.removeEventListener("mouseup", this.handleMouseUp);
      document.removeEventListener("mousemove", this.handleMouseMove);
    },
    handleMouseMove(e) {
      this.moveCardTo(e.clientX, e.clientY);
    },
    handleCardTouchStart(e) {
      this.drag.target = e.currentTarget;
      this.drag.clientX = e.changedTouches[0].clientX;
      this.drag.clientY = e.changedTouches[0].clientY;

      this.rearrangeCards();

      document.addEventListener("touchend", this.handleTouchEnd);
      document.addEventListener("touchmove", this.handleTouchMove, {
        passive: true,
      });
    },
    handleTouchEnd() {
      document.removeEventListener("touchend", this.handleTouchEnd);
      document.removeEventListener("touchmove", this.handleTouchMove);
    },
    handleTouchMove(e) {
      this.moveCardTo(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
    },
    moveCardTo(clientX, clientY) {
      // calculate move offset
      const offsetX = this.drag.clientX - clientX;
      const offsetY = this.drag.clientY - clientY;

      // save position
      this.drag.clientX = clientX;
      this.drag.clientY = clientY;

      // set element's new position
      this.drag.target.style.left = `${
        this.drag.target.offsetLeft - offsetX
      }px`;
      this.drag.target.style.top = `${this.drag.target.offsetTop - offsetY}px`;
    },
    cleanupEventListeners() {
      window.removeEventListener("resize", this.reCalculate);
      document.removeEventListener("mouseup", this.handleMouseUp);
      document.removeEventListener("mousemove", this.handleMouseMove);
      document.removeEventListener("touchend", this.handleTouchEnd);
      document.removeEventListener("touchmove", this.handleTouchMove);
    },
  },
};

function getRandomPointsOnPlane(width, height, numberOfPoints) {
  // use poisson disk sampling algorithm
  const radius = Math.sqrt((width * height) / numberOfPoints / Math.PI);
  const pds = new FastPoissonDiskSampling({
    shape: [width, height],
    radius: radius,
  });
  const points = pds.fill();

  // select random points from generated array
  return sliceRandom(points, numberOfPoints);
}

function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

function sliceRandom(array, numberOfItems) {
  const shuffled = array.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, numberOfItems);
}

function isOdd(number) {
  return number % 2;
}
</script>

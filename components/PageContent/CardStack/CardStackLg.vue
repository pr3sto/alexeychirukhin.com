<template>
  <div
    class="cardstack"
    :style="cssVars"
    :class="{ 'cardstack--with-border': content.showBorder }"
  >
    <div
      class="cardstack-cards"
      :class="{ 'cardstack-cards--with-border': content.showBorder }"
    >
      <div
        class="cardstack-card"
        v-for="(card, index) of content.cards.slice().reverse()"
        :key="index"
        :data-index="index"
        ref="cards"
        v-on:mousedown="handleCardMouseDown"
        v-on:touchstart="handleCardTouchStart"
        v-on:click="handleCardClick"
      >
        <component :is="card.type" :card="card" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "~/assets/scss/variables" as vars;

.cardstack {
  position: relative;
  height: 100vh;

  &--with-border::after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    box-shadow: inset 0 30px 10px -20px var(--page-background-color),
      inset 0 -30px 10px -20px var(--page-background-color);
    pointer-events: none;
  }
}

.cardstack-cards {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 0; /* creates stacking context for cards */
  overflow: hidden;
  font-size: var(--font-size);
  line-height: var(--line-height);

  &--with-border {
    border-top: 2px solid var(--page-background-color);
    border-bottom: 2px solid var(--page-background-color);
  }
}

.cardstack-card {
  position: absolute;
  height: var(--cardstack-card-height);
  width: var(--cardstack-card-width);
  transform-origin: center;
  cursor: grab;
  touch-action: none;

  &:active {
    cursor: grabbing;
  }
}
</style>

<script>
import DarkslideCard from "./DarkslideCard.vue";
import FastPoissonDiskSampling from "fast-2d-poisson-disk-sampling";
import PhotoCard from "./PhotoCard.vue";
import cardstack from "~/constants/cardstack.js";


export default {
  name: "CardStackLg",
  props: ["content"],
  components: { DarkslideCard, PhotoCard },

  computed: {
    cssVars() {
      return {
        "--cardstack-card-height": `${this.cardstackCardHeight}px`,
        "--cardstack-card-width": `${this.cardstackCardWidth}px`,
        "--font-size": `${this.fontSize}px`,
        "--line-height": `${this.fontSize}px`,
      };
    },
  },

  data() {
    return {
      elementResizeObserver: null,
      cardstackCardHeight: 0,
      cardstackCardWidth: 0,
      fontSize: 0,
      cardWasDragged: false,
      draggableCard: {
        element: undefined,
        initialCardY: 0,
        initialPositionX: 0,
        initialMouseX: 0,
        initialMouseY: 0,
      },
    };
  },

  mounted() {
    this.$nextTick(() => {
      this.recalculateCardDimensions();
      this.distributeCards();
    });

    this.elementResizeObserver = new ResizeObserver(
      this.lodash.throttle(this.recalculateCardDimensions, 50)
    );
    this.elementResizeObserver.observe(this.$el);
  },

  beforeDestroy() {
    this.elementResizeObserver.disconnect();
    this.elementResizeObserver = null;
    this.cleanupEventListeners();
  },

  methods: {
    recalculateCardDimensions() {
      const containerRect = this.$el.getBoundingClientRect();

      // calc width and height of a card based on a container bounds
      const maxCardWidth = containerRect.width * this.content.cardScale;
      const maxCardHeigth = containerRect.height * this.content.cardScale;
      if (maxCardWidth / maxCardHeigth > cardstack.CARD_ASPECT_RATIO) {
        this.cardstackCardHeight = maxCardHeigth;
        this.cardstackCardWidth = maxCardHeigth * cardstack.CARD_ASPECT_RATIO;
        this.fontSize = maxCardHeigth / cardstack.FONT_SIZE_FACTOR1;
      } else {
        this.cardstackCardHeight = maxCardWidth / cardstack.CARD_ASPECT_RATIO;
        this.cardstackCardWidth = maxCardWidth;
        this.fontSize = maxCardWidth / cardstack.FONT_SIZE_FACTOR2;
      }
    },
    distributeCards() {
      const containerRect = this.$el.getBoundingClientRect();

      // max offset for card
      const maxOffsetX = containerRect.width - this.cardstackCardWidth;
      const maxOffsetY = containerRect.height - this.cardstackCardHeight;

      // padding, because we don't want to move cards close to edges
      const paddingX =
        maxOffsetX * cardstack.desktop.CARD_CONTAINER_PADDING_PERCENT;
      const paddingY =
        maxOffsetY * cardstack.desktop.CARD_CONTAINER_PADDING_PERCENT;

      // 2d plane for random points
      const planeWidth = maxOffsetX - paddingX * 2;
      const planeHeight = maxOffsetY - paddingY * 2;

      // get random points on 2d area
      const randomPoints = getRandomPointsOnPlane(
        planeWidth,
        planeHeight,
        this.content.cards.length
      );

      // transform each card
      this.$refs["cards"].forEach((element) => {
        const index = parseInt(element.dataset.index);

        const x = randomPoints[index][0] + paddingX;
        const y = randomPoints[index][1] + paddingY;

        // z-index
        element.style.zIndex = index + 1;

        // transform rotate
        let rotate =
          getRandomNumber(0, cardstack.desktop.CARD_MAX_ROTATE_ANGLE_DEG) *
          (isOdd(index) ? 1 : -1);
        element.style.transform = `rotate(${rotate}deg)`;

        // left and top
        this.moveCardElement(element, x, y);
      });
    },
    bringCardOnTop(cardElement) {
      // move current card on top
      this.$refs["cards"]
        .filter((el) => el.style.zIndex > cardElement.style.zIndex)
        .forEach((element) => {
          element.style.zIndex--;
        });
      cardElement.style.zIndex = this.content.cards.length;
    },
    moveCardTo(clientX, clientY) {
      const containerRect = this.$el.getBoundingClientRect();

      // calculate move offset
      const offsetX = clientX - this.draggableCard.initialMouseX;
      const offsetY = clientY - this.draggableCard.initialMouseY;

      const position = percentToPx(
        {
          x: this.draggableCard.initialPositionX,
          y: this.draggableCard.initialCardY,
        },
        containerRect.width,
        containerRect.height
      );

      // set new position
      this.moveCardElement(
        this.draggableCard.element,
        position.x + offsetX,
        position.y + offsetY
      );
    },
    moveCardElement(element, x, y) {
      const containerRect = this.$el.getBoundingClientRect();
      const position = pxToPercent(
        { x, y },
        containerRect.width,
        containerRect.height
      );
      element.style.left = `${position.x}%`;
      element.style.top = `${position.y}%`;
    },
    handleCardMouseDown(e) {
      e.stopPropagation();
      e.preventDefault();

      this.cardWasDragged = false;

      this.draggableCard.element = e.currentTarget;
      this.draggableCard.initialMouseX = e.clientX;
      this.draggableCard.initialMouseY = e.clientY;
      this.draggableCard.initialCardY = e.currentTarget.style.top
        ? parseFloat(e.currentTarget.style.top.slice(0, -1))
        : 0;
      this.draggableCard.initialPositionX = e.currentTarget.style.left
        ? parseFloat(e.currentTarget.style.left.slice(0, -1))
        : 0;

      this.bringCardOnTop(e.currentTarget);

      document.addEventListener("mouseup", this.handleMouseUp);
      document.addEventListener("mousemove", this.handleMouseMove);
    },
    handleMouseUp() {
      document.removeEventListener("mouseup", this.handleMouseUp);
      document.removeEventListener("mousemove", this.handleMouseMove);
    },
    handleMouseMove(e) {
      this.cardWasDragged = true;
      this.moveCardTo(e.clientX, e.clientY);
    },
    handleCardClick(e) {
      // prevent click on links if card was dragged
      if (this.cardWasDragged) {
        e.stopPropagation();
        e.preventDefault();
      }
    },
    handleCardTouchStart(e) {
      // prevent multitouch
      if (e.touches.length > 1) {
        this.handleTouchEnd();
        return;
      }

      this.draggableCard.element = e.currentTarget;
      this.draggableCard.initialMouseX = e.changedTouches[0].clientX;
      this.draggableCard.initialMouseY = e.changedTouches[0].clientY;
      this.draggableCard.initialCardY = e.currentTarget.style.top
        ? parseFloat(e.currentTarget.style.top.slice(0, -1))
        : 0;
      this.draggableCard.initialPositionX = e.currentTarget.style.left
        ? parseFloat(e.currentTarget.style.left.slice(0, -1))
        : 0;

      this.bringCardOnTop(e.currentTarget);

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
    cleanupEventListeners() {
      document.removeEventListener("mouseup", this.handleMouseUp);
      document.removeEventListener("mousemove", this.handleMouseMove);
      document.removeEventListener("touchend", this.handleTouchEnd);
      document.removeEventListener("touchmove", this.handleTouchMove);
    },
  },
};

function getRandomPointsOnPlane(width, height, numberOfPoints) {
  // use poisson disk sampling algorithm
  const radius = Math.sqrt((width * height) / (numberOfPoints * 2));
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
  const _ = require("lodash");
  const shuffled = _.shuffle(array);
  return shuffled.slice(0, numberOfItems);
}

function isOdd(number) {
  return number % 2;
}

function pxToPercent(pos, width, height) {
  return {
    x: (pos.x / width) * 100,
    y: (pos.y / height) * 100,
  };
}

function percentToPx(pos, width, height) {
  return {
    x: (pos.x / 100) * width,
    y: (pos.y / 100) * height,
  };
}
</script>

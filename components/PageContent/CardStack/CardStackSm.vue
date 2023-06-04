<template>
  <div class="cardstack" :style="cssVars">
    <component
      class="cardstack-card pageload"
      v-for="(card, index) of content.cards"
      :key="index"
      :data-index="index"
      ref="cards"
      :is="card.type"
      :card="card"
      v-on:click.native="handleCardClick"
    />
  </div>
</template>

<style lang="scss" scoped>
@use "~/assets/scss/variables" as vars;

.cardstack {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: var(--cardstack-height);
  z-index: 0; /* creates stacking context for cards */
  overflow: hidden;
}

.cardstack-card {
  position: absolute;
  height: var(--cardstack-card-height);
  width: var(--cardstack-card-width);
  z-index: 2;
  font-size: var(--font-size);
  line-height: var(--line-height);
  transform-origin: 0 0;
  transform: translateX(5%) rotate(4deg) scale(1);
  transition: transform 0.4s vars.$general__transition-func--default 0.1s;
  cursor: pointer;

  &--current {
    z-index: 5;
    transform: translateX(0) translateY(0) rotate(0) scale(1);
  }

  &--next {
    z-index: 4;
    transform: translateX(5%) translateY(-4%) rotate(4deg) scale(1);
  }

  &--next2 {
    z-index: 3;
  }

  &--out {
    z-index: 1;
    animation: cardstack-card-out 0.5s vars.$general__transition-func--default;
    transform: translateX(13%) translateY(-8%) rotate(8deg) scale(0.95);
    transition: none !important;
  }

  /* dim the card */
  &::after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: #000;
    opacity: 0;
    transition: opacity 0.4s linear;
    pointer-events: none;
  }

  /* dim the next card */
  &--next::after {
    opacity: 0.05;
  }

  /* dim the last card */
  &--out::after {
    opacity: 0.1;
  }
}

/* skip animation on pageload */
.pageload,
.pageload::after {
  animation: none !important;
  transition: none !important;
}

@keyframes cardstack-card-out {
  0% {
    z-index: 10;
    transform: translateX(0) translateY(0) rotate(0deg) scale(1);
  }
  50% {
    transform: translateX(-13%) translateY(-120%) rotate(-4deg);
  }
  60% {
    z-index: 1;
  }
  100% {
    transform: translateX(13%) translateY(-8%) rotate(8deg) scale(0.95);
  }
}
</style>

<script>
import DarkslideCard from "./DarkslideCard.vue";
import PhotoCard from "./PhotoCard.vue";
import cardstack from "~/constants/cardstack.js";

export default {
  name: "CardStackSm",
  props: ["content"],
  components: { DarkslideCard, PhotoCard },

  computed: {
    cssVars() {
      return {
        "--cardstack-height": `${this.cardstackHeight}px`,
        "--cardstack-card-height": `${this.cardstackCardHeight}px`,
        "--cardstack-card-width": `${this.cardstackCardWidth}px`,
        "--font-size": `${this.fontSize}px`,
        "--line-height": `${this.fontSize}px`,
      };
    },
  },

  data() {
    return {
      topCardIndex: 0,
      elementResizeObserver: null,
      cardstackHeight: 0,
      cardstackCardHeight: 0,
      cardstackCardWidth: 0,
      fontSize: 0,
    };
  },

  mounted() {
    this.$nextTick(() => {
      this.recalculateCardDimensions();
      this.arrangeCards(true);
    });

    this.elementResizeObserver = new ResizeObserver(
      this.lodash.throttle(this.recalculateCardDimensions, 50)
    );
    this.elementResizeObserver.observe(this.$el);
  },

  beforeDestroy() {
    this.elementResizeObserver.disconnect();
    this.elementResizeObserver = null;
  },

  methods: {
    handleCardClick(e) {
      // prevent click on href
      if (e.target.tagName.toLowerCase() === "a") {
        return;
      }

      // prevent click when text is selected
      if (document.getSelection().type === "Range") {
        return;
      }

      this.switchCards();
    },
    recalculateCardDimensions() {
      const containerRect = this.$el.getBoundingClientRect();

      const cardWidth = containerRect.width * this.content.cardScale;
      const cardHeight = cardWidth / cardstack.CARD_ASPECT_RATIO;

      this.cardstackHeight = cardHeight / this.content.cardScale;
      this.cardstackCardWidth = cardWidth;
      this.cardstackCardHeight = cardHeight;
      this.fontSize = cardWidth / cardstack.FONT_SIZE_FACTOR2;
    },
    switchCards() {
      // don't switch one card
      if (this.content.cards.length <= 1) {
        return;
      }

      this.topCardIndex = mod(this.topCardIndex + 1, this.content.cards.length);
      this.arrangeCards(false);
    },
    arrangeCards(pageload) {
      const cardsLength = this.content.cards.length;

      this.$refs["cards"].forEach((card) => {
        card.$el.classList.remove("cardstack-card--current");
        card.$el.classList.remove("cardstack-card--next");
        card.$el.classList.remove("cardstack-card--next2");
        card.$el.classList.remove("cardstack-card--out");
        if (!pageload) {
          card.$el.classList.remove("pageload");
        }
      });

      if (cardsLength > 0) {
        const card = this.getCardByIndex(this.topCardIndex);
        card && card.$el.classList.add("cardstack-card--current");
      }
      if (cardsLength > 1) {
        const index = mod(this.topCardIndex - 1, cardsLength);
        const card = this.getCardByIndex(index);
        card && card.$el.classList.add("cardstack-card--out");
      }
      if (cardsLength > 2) {
        const index = mod(this.topCardIndex + 1, cardsLength);
        const card = this.getCardByIndex(index);
        card && card.$el.classList.add("cardstack-card--next");
      }
      if (cardsLength > 3) {
        const index = mod(this.topCardIndex + 2, cardsLength);
        const card = this.getCardByIndex(index);
        card && card.$el.classList.add("cardstack-card--next2");
      }
    },
    getCardByIndex(index) {
      return this.$refs["cards"].find(
        (card) => card.$el.dataset.index === index.toString()
      );
    },
  },
};

function mod(n, m) {
  return ((n % m) + m) % m;
}
</script>

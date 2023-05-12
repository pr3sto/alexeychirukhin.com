<template>
  <div class="cardstack" :style="cssVars">
    <component
      class="cardstack-card"
      v-for="(card, index) of annotatedCards"
      :key="index"
      :class="card.class"
      :is="card.type"
      :card="card"
      :fontSize="fontSize"
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
  cursor: pointer;

  z-index: 2;
  transform-origin: 0 0;
  transform: translateX(5%) rotate(4deg) scale(1);
  transition: transform 0.4s vars.$default-transition-func 0.1s;

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
    animation: cardstack-card-out 0.5s vars.$default-transition-func;
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
.pageload {
  animation: none !important;
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
import cardstack from "~/constants/cardstack.js";
import PhotoCard from "./PhotoCard.vue";
import DarkslideCard from "./DarkslideCard.vue";

export default {
  name: "CardStackSm",
  props: ["content"],
  components: { PhotoCard, DarkslideCard },

  computed: {
    cssVars() {
      return {
        "--cardstack-height": `${this.cardstackHeight}px`,
        "--cardstack-card-height": `${this.cardstackCardHeight}px`,
        "--cardstack-card-width": `${this.cardstackCardWidth}px`,
      };
    },
  },

  data() {
    return {
      elementResizeObserver: null,
      annotatedCards: annotateCards(this.content.cards, 0, true),
      cardstackHeight: 0,
      cardstackCardHeight: 0,
      cardstackCardWidth: 0,
      fontSize: 0,
    };
  },

  mounted() {
    this.$nextTick(() => {
      this.recalculateCardDimensions();
    });

    this.elementResizeObserver = new ResizeObserver(
      this.recalculateCardDimensions
    );
    this.elementResizeObserver.observe(this.$el);
  },

  beforeDestroy() {
    this.elementResizeObserver.disconnect();
    this.elementResizeObserver = null;
  },

  methods: {
    recalculateCardDimensions() {
      const containerRect = this.$el.getBoundingClientRect();

      // multiply by 0.95 to fit angled cards
      const cardScale = this.content.cardScale * 0.95;

      const cardWidth = containerRect.width * cardScale;
      const cardHeight = cardWidth / cardstack.CARD_ASPECT_RATIO;

      this.cardstackHeight = cardHeight / cardScale;
      this.cardstackCardWidth = cardWidth;
      this.cardstackCardHeight = cardHeight;
      this.fontSize = cardWidth / cardstack.FONT_SIZE_FACTOR2;
    },
    switchCards() {
      // don't switch one card
      if (this.annotatedCards.length <= 1) {
        return;
      }

      const currentTopCardIndex = this.annotatedCards.findIndex((card) => {
        return card.class == "cardstack-card--current";
      });

      const newTopCardIndex = mod(
        currentTopCardIndex + 1,
        this.content.cards.length
      );

      // trigger Vue reactive update
      this.$nextTick(() => {
        this.annotatedCards = [];
        this.annotatedCards = annotateCards(
          this.content.cards,
          newTopCardIndex,
          false
        );
      });
    },
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
  },
};

function annotateCards(cards, topCardIndex, pageload) {
  cards.forEach((card) => {
    card.class = "";
  });
  if (cards.length > 0) {
    cards[topCardIndex].class = "cardstack-card--current";
  }
  if (cards.length > 1) {
    const index = mod(topCardIndex - 1, cards.length);
    if (pageload) {
      cards[index].class = "cardstack-card--out pageload";
    } else {
      cards[index].class = "cardstack-card--out";
    }
  }
  if (cards.length > 2) {
    const index = mod(topCardIndex + 1, cards.length);
    cards[index].class = "cardstack-card--next";
  }
  if (cards.length > 3) {
    const index = mod(topCardIndex + 2, cards.length);
    cards[index].class = "cardstack-card--next2";
  }
  return cards;
}

function mod(n, m) {
  return ((n % m) + m) % m;
}
</script>

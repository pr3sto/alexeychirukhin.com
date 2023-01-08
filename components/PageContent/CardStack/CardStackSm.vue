<template>
  <div class="cardstack" :style="cssVars">
    <div class="cardstack-content">
      <div class="cardstack-content-cards">
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
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "~/assets/scss/variables" as vars;

.cardstack {
  position: relative;
  z-index: 0; /* creates stacking context for cards */
}

.cardstack-content {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 5%;
  right: 5%;
  top: 10%;
  bottom: 10%;
}

.cardstack-content-cards {
  position: relative;
  height: var(--cardstack-container-height);
  width: var(--cardstack-container-width);
  aspect-ratio: 0.82;
}

.cardstack-card {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  cursor: pointer;
  transform: translateX(5%) rotate(4deg) scale(1);
  transform-origin: 0 0;
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
    pointer-events: none;
    content: "";
    background-color: #000;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    opacity: 0;
    transition: opacity 0.4s linear;
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
import * as cardstackConstants from "~/constants/cardstack.js";
import PhotoCard from "./PhotoCard.vue";
import DarkslideCard from "./DarkslideCard.vue";

export default {
  name: "CardStackSm",
  props: ["content"],
  components: { PhotoCard, DarkslideCard },

  computed: {
    cssVars() {
      return {
        "--cardstack-container-height": this.cardstackContainerHeight,
        "--cardstack-container-width": this.cardstackContainerWidth,
      };
    },
  },

  data() {
    return {
      annotatedCards: annotateCards(this.content.cards, 0, true),
      cardstackContainerHeight: "auto",
      cardstackContainerWidth: "100%",
      fontSize: 0,
    };
  },

  mounted() {
    setTimeout(() => {
      this.$nextTick(() => {
        this.reCalculate();
      });
    });

    window.addEventListener("resize", this.reCalculate);
  },

  beforeDestroy() {
    this.cleanupEventListeners();
  },

  methods: {
    reCalculate() {
      const containerRect = this.$el.children[0].getBoundingClientRect();
      if (
        containerRect.width / containerRect.height >
        cardstackConstants.CARD_ASPECT_RATIO
      ) {
        this.cardstackContainerHeight = "100%";
        this.cardstackContainerWidth = "auto";
        this.fontSize =
          containerRect.height / cardstackConstants.FONT_SIZE_FACTOR1;
      } else {
        this.cardstackContainerHeight = "auto";
        this.cardstackContainerWidth = "100%";
        this.fontSize =
          containerRect.width / cardstackConstants.FONT_SIZE_FACTOR2;
      }
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
    switchCards() {
      // don't switch one card
      if (this.annotatedCards.length < 2) {
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
    cleanupEventListeners() {
      window.removeEventListener("resize", this.reCalculate);
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

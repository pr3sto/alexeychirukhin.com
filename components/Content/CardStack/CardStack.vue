<template>
  <div class="cardstack" :style="cssVars">
    <div class="cardstack-content">
      <div class="cardstack-cards-container">
        <component
          class="cardstack-card"
          v-for="(card, index) of annotatedCards"
          :is="card.type"
          :key="index"
          :class="card.class"
          v-on:click.native="switchCards"
          :card="card"
          :fontSize="fontSize"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.cardstack {
  position: relative;
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

.cardstack-cards-container {
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
  transition: transform 0.5s cubic-bezier(0.8, 0.2, 0.1, 0.8) 0.1s;
}

.cardstack-card--current {
  z-index: 5;
  transform: translateX(0) translateY(0) rotate(0) scale(1);
}

.cardstack-card--next {
  z-index: 4;
  transform: translateX(5%) translateY(-4%) rotate(4deg) scale(1);
}

.cardstack-card--next2 {
  z-index: 3;
}

.cardstack-card--out {
  z-index: 1;
  animation: cardstack-card-out 0.6s cubic-bezier(0.8, 0.2, 0.1, 0.8);
  transform: translateX(13%) translateY(-8%) rotate(8deg) scale(0.95);
}

/* dim the card */
.cardstack-card::after {
  pointer-events: none;
  content: "";
  background-color: #000;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  opacity: 0;
  transition: opacity 0.5s linear;
}

/* dim the next card */
.cardstack-card--next::after {
  opacity: 0.05;
}

/* dim the last card */
.cardstack-card--out::after {
  opacity: 0.1;
}

/* skip animation on pageload */
.pageload {
  animation: none !important;
}

@keyframes cardstack-card-out {
  0% {
    z-index: 10;
    transform: translateX(0) translateY(0) rotate(0deg);
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

@media only screen and (max-width: 700px) {
  .cardstack-card--out {
    animation: none !important;
  }
}
</style>

<script>
import PhotoCard from "~/components/Content/CardStack/PhotoCard.vue";
import DarkslideCard from "~/components/Content/CardStack/DarkslideCard.vue";

export default {
  name: "CardStack",
  props: ["cards"],
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
      annotatedCards: this.annotateCards(this.cards, 0, true),
      cardstackContainerHeight: "auto",
      cardstackContainerWidth: "auto",
      fontSize: 0,
    };
  },

  mounted() {
    this.$nextTick(() => {
      this.reCalculate();
    });

    window.addEventListener("resize", this.reCalculate);
  },

  updated() {
    this.$nextTick(() => {
      this.reCalculate();
    });
  },

  beforeDestroy() {
    window.removeEventListener("resize", this.reCalculate);
  },

  methods: {
    reCalculate: function () {
      var containerRect = this.$el.children[0].getBoundingClientRect();
      if (containerRect.width / containerRect.height > 0.83) {
        this.cardstackContainerHeight = "100%";
        this.cardstackContainerWidth = "auto";
        this.fontSize = containerRect.height / 45;
      } else {
        this.cardstackContainerHeight = "auto";
        this.cardstackContainerWidth = "100%";
        this.fontSize = containerRect.width / 37;
      }
    },
    switchCards: function (event) {
      // prevent click on href
      if (event.target.tagName.toLowerCase() === "a") {
        return;
      }
      // prevent click when text is selected
      var selection = document.getSelection();
      if (selection.type === "Range") {
        return;
      }

      // don't switch one card
      if (this.annotatedCards.length < 2) {
        return;
      }

      var currentTopCardIndex = this.annotatedCards.findIndex((card) => {
        return card.class == "cardstack-card--current";
      });

      var newTopCardIndex = this.mod(
        currentTopCardIndex + 1,
        this.cards.length
      );

      // trigger Vue reactive update
      this.$nextTick(() => {
        this.annotatedCards = [];
        this.annotatedCards = this.annotateCards(
          this.cards,
          newTopCardIndex,
          false
        );
      });
    },
    annotateCards: function (cards, topCardIndex, pageload) {
      cards.forEach((card) => {
        card.class = "";
      });
      if (cards.length > 0) {
        cards[topCardIndex].class = "cardstack-card--current";
      }
      if (cards.length > 1) {
        var index = this.mod(topCardIndex - 1, cards.length);
        if (pageload) {
          cards[index].class = "cardstack-card--out pageload";
        } else {
          cards[index].class = "cardstack-card--out";
        }
      }
      if (cards.length > 2) {
        var index = this.mod(topCardIndex + 1, cards.length);
        cards[index].class = "cardstack-card--next";
      }
      if (cards.length > 3) {
        var index = this.mod(topCardIndex + 2, cards.length);
        cards[index].class = "cardstack-card--next2";
      }
      return cards;
    },
    mod: function (n, m) {
      return ((n % m) + m) % m;
    },
  },
};
</script>

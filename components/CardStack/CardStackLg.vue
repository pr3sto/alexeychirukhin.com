<script lang="ts" setup>
import { CardStack, DarkslideCard, PhotoCard } from "~/app/types/page";
import * as constants from "~/constants/cardstack";

const props = defineProps({
  content: {
    type: Object as PropType<CardStack>,
    required: true,
  },
});

// html elements
const root = ref<HTMLElement>();
const cards = ref<Array<HTMLElement>>();

// state
const cardHeight = ref(0);
const cardWidth = ref(0);
const fontSize = ref(0);

const mathUtils = useMathUtils();
const dragHelper = useDragHelper();

let elementResizeObserver: ResizeObserver | null;

const cssVars = computed(() => {
  return {
    "--cardstack-card-height": `${cardHeight.value}px`,
    "--cardstack-card-width": `${cardWidth.value}px`,
    "--font-size": `${fontSize.value}px`,
    "--line-height": `${fontSize.value}px`,
  };
});

// methods
const recalculateCardDimensions = () => {
  if (!root.value) return;

  const containerRect = root.value.getBoundingClientRect();

  // calc width and height of a card based on a container bounds
  const maxCardWidth = containerRect.width * props.content.cardScale;
  const maxCardHeigth = containerRect.height * props.content.cardScale;

  if (maxCardWidth / maxCardHeigth > constants.CARD_ASPECT_RATIO) {
    cardHeight.value = maxCardHeigth;
    cardWidth.value = maxCardHeigth * constants.CARD_ASPECT_RATIO;
    fontSize.value = maxCardHeigth / constants.FONT_SIZE_FACTOR1;
  } else {
    cardHeight.value = maxCardWidth / constants.CARD_ASPECT_RATIO;
    cardWidth.value = maxCardWidth;
    fontSize.value = maxCardWidth / constants.FONT_SIZE_FACTOR2;
  }
};

const distributeCards = () => {
  if (!root.value || !cards.value) return;

  const containerRect = root.value.getBoundingClientRect();

  // max offset for card
  const maxOffsetX = containerRect.width - cardWidth.value;
  const maxOffsetY = containerRect.height - cardHeight.value;

  // padding, because we don't want to move cards close to edges
  const paddingX = maxOffsetX * constants.CARD_CONTAINER_PADDING_PERCENT;
  const paddingY = maxOffsetY * constants.CARD_CONTAINER_PADDING_PERCENT;

  // 2d plane for random points
  const planeWidth = maxOffsetX - paddingX * 2;
  const planeHeight = maxOffsetY - paddingY * 2;

  // get random points on 2d area
  const randomPoints = mathUtils.getRandomPointsOnPlane(
    planeWidth,
    planeHeight,
    props.content.cards.length,
  );

  // transform each card
  cards.value.forEach((card: HTMLElement) => {
    const index = parseInt(card.dataset.index ?? "0");

    const x = randomPoints[index][0] + paddingX;
    const y = randomPoints[index][1] + paddingY;

    // z-index
    card.style.zIndex = (index + 1).toString();

    // transform rotate
    const angle =
      mathUtils.getRandomNumber(0, constants.CARD_MAX_ROTATE_ANGLE_DEG) *
      (mathUtils.isOdd(index) ? 1 : -1);
    card.style.transform = `rotate(${angle}deg)`;

    setCardPosition(card, x, y);
  });
};

const bringCardOnTop = (card: HTMLElement) => {
  if (!cards.value) return;

  // decrease z-index of all cards except current
  cards.value
    .filter((el) => el.style.zIndex > card.style.zIndex)
    .forEach((el) => {
      el.style.zIndex = (parseInt(el.style.zIndex) - 1).toString();
    });

  // move current card on top
  card.style.zIndex = props.content.cards.length.toString();
};

const setCardPosition = (card: HTMLElement, x: number, y: number) => {
  if (!root.value) return;

  const containerRect = root.value.getBoundingClientRect();
  const position = mathUtils.pxToPercent(
    { x, y },
    containerRect.width,
    containerRect.height,
  );

  card.style.left = `${position.x}%`;
  card.style.top = `${position.y}%`;
};

const handleCardMouseDown = (e: MouseEvent) => {
  e.stopPropagation();
  e.preventDefault();

  bringCardOnTop(e.currentTarget as HTMLElement);
  if (root.value) {
    dragHelper.startDrag(e, root.value);
  }
};

const handleCardTouchStart = (e: TouchEvent) => {
  // prevent multitouch
  if (e.touches.length > 1) {
    return;
  }

  bringCardOnTop(e.currentTarget as HTMLElement);
  if (root.value) {
    dragHelper.startDrag(e, root.value);
  }
};

// events
onMounted(() => {
  recalculateCardDimensions();
  distributeCards();

  if (root.value) {
    elementResizeObserver = new ResizeObserver(
      useThrottle(recalculateCardDimensions, 50),
    );
    elementResizeObserver.observe(root.value);
  }
});

onUnmounted(() => {
  if (elementResizeObserver) {
    elementResizeObserver.disconnect();
    elementResizeObserver = null;
  }
});

// dynamic components
const CardStackPhotoCard = resolveComponent("CardStackPhotoCard");
const CardStackDarkslideCard = resolveComponent("CardStackDarkslideCard");

const resolveComponentForCard = (
  card: PhotoCard | DarkslideCard,
): Object | string => {
  switch (card.type) {
    case "PhotoCard":
      return CardStackPhotoCard;
    case "DarkslideCard":
      return CardStackDarkslideCard;
    default:
      return "div";
  }
};
</script>

<template>
  <div
    ref="root"
    class="cardstack"
    :class="{ 'cardstack--with-border': content.showBorder }"
    :style="cssVars"
  >
    <div
      class="cardstack-cards"
      :class="{ 'cardstack-cards--with-border': content.showBorder }"
    >
      <div
        v-for="(card, index) of content.cards.slice().reverse()"
        :key="index"
        ref="cards"
        :data-index="index"
        class="cardstack-card"
        @mousedown="handleCardMouseDown"
        @touchstart="handleCardTouchStart"
      >
        <component :is="resolveComponentForCard(card)" :card="card" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.cardstack {
  position: relative;
  height: 100vh;
  width: 100%;

  &--with-border::after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    box-shadow:
      inset 0 30px 10px -20px var($page-styles__background-color),
      inset 0 -30px 10px -20px var($page-styles__background-color);
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
    border-top: 2px solid var($page-styles__background-color);
    border-bottom: 2px solid var($page-styles__background-color);
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

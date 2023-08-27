<script lang="ts" setup>
import { PhotoCard } from "~/app/types/page";

defineProps({
  card: {
    type: Object as PropType<PhotoCard>,
    required: true,
  },
});

const config = useRuntimeConfig();
</script>

<template>
  <figure class="photocard">
    <div
      class="photocard-photo"
      :class="{ 'photocard-photo--round': card.round }"
    >
      <nuxt-img
        class="photocard-photo-img"
        :provider="config.public.NUXT_IMG_PROVIDER"
        preset="progressivejpg"
        loading="eager"
        :src="card.photoUrl"
      />
    </div>
    <div v-if="card.caption" class="photocard-caption">
      <span>{{ card.caption }}</span>
    </div>
  </figure>
</template>

<style lang="scss" scoped>
.photocard {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 6% 6% 0 6%;
  box-shadow: 1px 1px 6px -4px #000;
  background-color: #f9f9f9;
  user-select: none;

  /* texture */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAHCAYAAADam2dgAAAAAXNSR0IArs4c6QAAADFJREFUKFNjZGBgkGJgYHjGgBtIMULlcCkEi8MUgdSiK4TzkRUhK0TRQJJJBN1E0HcAEQkMPPAHd4YAAAAASUVORK5CYII=);
    background-size: 0.7em;
    opacity: 0.4;
    pointer-events: none;
  }
}

.photocard-photo {
  position: relative;
  width: 100%;
  aspect-ratio: 1;

  & img {
    position: relative;
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: var($page-styles__font-color);
    opacity: 0.1;
  }

  /* round photo */
  &--round img {
    border-radius: 50%;
  }
  &--round::before {
    border-radius: 50%;
  }
}

.photocard-photo-img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.photocard-caption {
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  padding: 8% 0;
  font-size: 2em;
  font-family: $general__font-family--handwriting1;
  font-weight: bolder;
  color: var($page-styles__font-color);
  opacity: 0.9;
}
</style>

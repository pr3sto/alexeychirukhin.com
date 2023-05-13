<template>
  <figure class="photocard" :style="cssVars">
    <div
      class="photocard-photo"
      :class="{ 'photocard-photo--round': card.round }"
    >
      <nuxt-img
        class="photocard-photo-img"
        provider="imagekit"
        preset="progressivejpg"
        :src="card.photoUrl"
      />
    </div>
    <div class="photocard-caption" v-if="card.caption">
      <span>{{ card.caption }}</span>
    </div>
  </figure>
</template>

<style lang="scss" scoped>
@use "~/assets/scss/variables" as vars;

.photocard {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 6% 6% 0 6%;
  border-radius: 0px;
  box-shadow: 1px 1px 7px -4px #000;
  background-color: #f9f9f9;
  font-size: var(--font-size);
  line-height: var(--line-height);

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
    opacity: 1;
    pointer-events: none;
  }
}

.photocard-photo {
  position: relative;
  width: 100%;
  aspect-ratio: 1;

  /* gloss effect */
  &::after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-image: url("/images/cardstack/gloss.png");
    background-size: cover;
    pointer-events: none;
  }

  /* round photo */
  &--round::after,
  &--round img {
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
  font-size: 3em;
  opacity: 0.9;
  font-family: vars.$handwriting1-font-family;
  font-weight: bolder;
  color: vars.$black-color;
}
</style>

<script>
export default {
  name: "PhotoCard",
  props: ["card", "fontSize"],
  computed: {
    cssVars() {
      return {
        "--font-size": `${this.fontSize}px`,
        "--line-height": `${this.fontSize}px`,
      };
    },
  },
};
</script>

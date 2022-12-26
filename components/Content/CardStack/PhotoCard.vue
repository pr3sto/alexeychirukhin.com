<template>
  <figure class="photocard" :style="cssVars">
    <div
      class="photocard-photo"
      :class="{ 'photocard-photo--round': card.round }"
    >
      <nuxt-img
        class="photocard-photo-img"
        provider="imagekit"
        sizes="md:800px lg:1500px"
        preset="progressivejpg"
        :src="card.photoUrl"
      />
    </div>
    <div class="photocard-signature" v-if="card.signature">
      <span>{{ card.signature }}</span>
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
    pointer-events: none;
    content: "";
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAHCAYAAADam2dgAAAAAXNSR0IArs4c6QAAADFJREFUKFNjZGBgkGJgYHjGgBtIMULlcCkEi8MUgdSiK4TzkRUhK0TRQJJJBN1E0HcAEQkMPPAHd4YAAAAASUVORK5CYII=);
    background-size: 0.7em;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    opacity: 0.3;
  }
}

.photocard-photo {
  position: relative;
  width: 100%;
  aspect-ratio: 1;

  /* gloss effect */
  &::after {
    pointer-events: none;
    content: "";
    background-image: url("/images/gloss.png");
    background-size: cover;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
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

.photocard-signature {
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8% 0;
  font-size: 3em;
  opacity: 0.9;
  font-family: vars.$handwriting-font-family;
  font-weight: bolder;

  &span {
    display: inline-block;
  }
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

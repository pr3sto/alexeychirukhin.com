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
    <div class="photocard-signature">
      {{ card.signature }}
    </div>
  </figure>
</template>

<style scoped>
.photocard {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 6% 6% 0 6%;
  border-radius: 1px;
  box-shadow: 2px 2px 6px -3px #000;
  background-color: rgb(253, 253, 253);
  font-size: var(--font-size);
  line-height: var(--line-height);
}

/* texture */
.photocard::before {
  pointer-events: none;
  content: "";
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAHCAYAAADam2dgAAAAAXNSR0IArs4c6QAAADFJREFUKFNjZGBgkGJgYHjGgBtIMULlcCkEi8MUgdSiK4TzkRUhK0TRQJJJBN1E0HcAEQkMPPAHd4YAAAAASUVORK5CYII=);
  background-size: 0.7em;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  opacity: 0.35;
}

.photocard-photo {
  position: relative;
  width: 100%;
  aspect-ratio: 1;
}

/* gloss effect on photo */
.photocard-photo::after {
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

.photocard-photo-img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* round photo */
.photocard-photo--round::after,
.photocard-photo--round img {
  border-radius: 50%;
}

.photocard-signature {
  flex-grow: 1;
  padding: 8% 0;
}
</style>

<script>
export default {
  name: "PhotoCard",
  props: ["card", "fontSize"],
  computed: {
    cssVars() {
      return {
        "--font-size": this.fontSize + "px",
        "--line-height": this.fontSize + "px",
      };
    },
  },
};
</script>

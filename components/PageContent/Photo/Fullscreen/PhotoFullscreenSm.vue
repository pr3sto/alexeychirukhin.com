<template>
  <transition
    name="opacity-transition-02s"
    v-on:before-enter="beforeFullscreenOpened"
    v-on:before-leave="beforeFullscreenClosed"
    v-on:after-leave="afterFullscreenClosed"
  >
    <div class="photo-fullscreen" v-show="showFullScreen">
      <div class="photo-fullscreen-img" v-if="showFullScreen">
        <nuxt-img
          :provider="$globalProperties.nuxtImgProvider"
          preset="progressivejpg"
          sizes="md:800px lg:1500px"
          :src="photoUrl"
        />
      </div>
      <div class="photo-fullscreen-controls" v-if="showFullScreen">
        <div class="photo-fullscreen-colorpicker">
          <figure
            class="photo-fullscreen-colorpicker-block photo-fullscreen-colorpicker-block--white"
            v-on:click="handleWhiteBgClick"
          />
          <figure
            class="photo-fullscreen-colorpicker-block photo-fullscreen-colorpicker-block--black"
            v-on:click="handleBlackBgClick"
          />
        </div>
        <p v-on:click="handleCloseButtonClick">close</p>
      </div>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
@use "~/assets/scss/variables" as vars;

.photo-fullscreen {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: grid;
  grid-template-rows: 1fr auto;
  grid-template-columns: 1fr auto 1fr;
  background: var(vars.$page-styles__fs-bg-color);
  transition: background vars.$general__transition--02s;
}

.photo-fullscreen-img {
  grid-row: 1/1;
  grid-column: 2/2;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  & > img {
    max-width: 100%;
    max-height: 100%;
    padding: vars.$general__padding--default;
  }
}

.photo-fullscreen-controls {
  grid-column: 2/2;
  grid-row: 2/2;
  display: flex;
  flex-direction: row;
  padding: vars.$general__padding--default;
  font-size: vars.$photo__close__font-size--sm;

  & > p {
    margin-left: auto;
    cursor: pointer;
  }
}

.photo-fullscreen-colorpicker {
  display: flex;
  flex-direction: row;
}

.photo-fullscreen-colorpicker-block {
  width: vars.$photo__close__font-size--sm;
  height: vars.$photo__close__font-size--sm;
  margin-right: calc(vars.$general__padding--default / 2);
  align-self: center;
  cursor: pointer;

  &--white {
    background: vars.$general__color--white;
    border: 1px solid vars.$general__color--black;
  }
  &--black {
    background: vars.$general__color--black;
    border: 1px solid vars.$general__color--white;
  }
}
</style>

<script>
import events from "~/constants/events.js";

export default {
  name: "PhotoFullscreenSm",

  data() {
    return {
      showFullScreen: false,
      photoUrl: "",
    };
  },

  mounted() {
    this.$root.$on(events.OPEN_FULLSCREEN, this.openFullscreen);
  },

  beforeDestroy() {
    this.$pageUtility.enablePageScroll();
    this.$root.$off(events.OPEN_FULLSCREEN, this.openFullscreen);
  },

  methods: {
    beforeFullscreenOpened() {
      this.$pageUtility.disablePageScroll();
    },
    beforeFullscreenClosed() {
      this.$pageUtility.enablePageScroll();
    },
    afterFullscreenClosed() {
      this.$root.$emit(events.FULLSCREEN_CLOSED);
    },
    handleWhiteBgClick() {
      this.$services.settings.photo.setWhiteFullscreenBgColor();
    },
    handleBlackBgClick() {
      this.$services.settings.photo.setBlackFullscreenBgColor();
    },
    handleCloseButtonClick() {
      this.showFullScreen = false;
    },
    openFullscreen(_, photoUrl) {
      this.photoUrl = photoUrl;
      this.showFullScreen = true;
    },
  },
};
</script>

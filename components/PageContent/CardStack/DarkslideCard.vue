<template>
  <figure class="darkslidecard">
    <div class="darkslidecard-content">
      <div class="darkslidecard-content-header">
        <img :src="require('~/assets/icons/arrow.png')" />
        <p>Insert film this side up.&#10;Do not remove this darkslide.</p>
      </div>
      <div class="darkslidecard-content-area" v-html="card.html" />
      <div class="darkslidecard-content-footer">
        <div class="darkslidecard-content-footer-left">
          <div class="darkslidecard-content-footer-left-dot" />
        </div>
        <div class="darkslidecard-content-footer-right">
          <p>{{ footerDate }}</p>
          <p>
            <b>{{ footerText }}</b
            >&#10;{{ footerAddress }}
          </p>
        </div>
      </div>
    </div>
    <div class="darkslidecard-black-label" />
  </figure>
</template>

<style lang="scss" scoped>
@use "~/assets/scss/variables" as vars;

.darkslidecard {
  width: 100%;
  height: 100%;
  color: #ffffff;
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  filter: drop-shadow(1px 1px 1px #000);
  z-index: 0; /* creates stacking context */
  user-select: none;

  /* shape of darkslide */
  &-content,
  &::after {
    clip-path: polygon(
      0 0,
      16% 0,
      16% 2%,
      100% 2%,
      100% 98%,
      95% 100%,
      5% 100%,
      0 98%
    );
  }
}

.darkslidecard-content {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: #232323;

  /* texture */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-image: url("~/assets/textures/paper.png");
    background-size: cover;
    opacity: 0.25;
    pointer-events: none;
  }
}

.darkslidecard-content-header {
  padding-top: 8%;
  padding-left: 50%;
  text-align: left;
  opacity: 0.8;

  & > img {
    width: 1.7em;
    height: 1.7em;
    margin-right: 0.1em;
  }

  & > p {
    display: inline-block;
    white-space: pre-line;
  }
}

.darkslidecard-content-area {
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  padding: 8%;
  opacity: 0.8;
}

.darkslidecard-content-footer {
  display: flex;
  flex-direction: row;
}

.darkslidecard-content-footer-left,
.darkslidecard-content-footer-right {
  width: 50%;
}

.darkslidecard-content-footer-left {
  display: flex;
}

.darkslidecard-content-footer-left-dot {
  align-self: flex-end;
  margin-left: 2em;
  margin-bottom: 0.5em;
  height: 1.5em;
  aspect-ratio: 1;
  background-color: #1e1e1e;
  border-radius: 50%;
  border-color: #ffffff1a;
  border-style: solid;
  border-width: 0 2px 2px 0;
}

.darkslidecard-content-footer-right {
  padding-bottom: 8%;
  text-align: left;
  opacity: 0.8;

  & > p {
    display: inline-block;
    margin-right: 1em;
    vertical-align: top;
    white-space: pre-line;
  }
}

.darkslidecard-black-label {
  position: absolute;
  top: -4%;
  left: 0;
  width: 11%;
  height: 5%;
  z-index: -1;
  background-color: #0a0a0a;
}
</style>

<script>
export default {
  name: "DarkslideCard",
  props: ["card"],

  computed: {
    footerDate() {
      return (
        ("0" + (new Date().getMonth() + 1)).slice(-2) + // month
        "/" +
        new Date().getFullYear().toString().slice(-2) // year
      );
    },
    footerAddress() {
      return window.location.host;
    },
    footerText({ $services }) {
      return $services.appState.getCurrentPageDisplayName();
    },
  },
};
</script>

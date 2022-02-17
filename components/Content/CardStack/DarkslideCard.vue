<template>
  <div class="darkslidecard" :style="cssVars">
    <div class="darkslidecard-content">
      <div class="darkslidecard-content-header">
        <img src="/images/arrow.png" />
        <div>Inser film this slide up.&#10;Do not remove this darkslide.</div>
      </div>
      <div class="darkslidecard-content-text" v-html="card.html" />
      <div class="darkslidecard-content-footer">
        <div class="darkslidecard-content-footer-left">
          <div class="darkslidecard-content-footer-left-dot" />
        </div>
        <div class="darkslidecard-content-footer-right">
          <div>{{ currentDate }}</div>
          <div><b>Alexey Chirukhin</b>&#10;alexeychirukhin.com</div>
        </div>
      </div>
    </div>
    <div class="darkslidecard-black-label" />
  </div>
</template>

<style>
.darkslidecard {
  width: 100%;
  height: 100%;
  color: #fff;
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  font-size: var(--font-size);
  line-height: var(--line-height);
  filter: drop-shadow(2px 2px 1px #000);
}

/* shape of darkslide */
.darkslidecard-content,
.darkslidecard::after {
  clip-path: polygon(
    16% 2%,
    100% 2%,
    100% 43%,
    100% 98%,
    95% 100%,
    5% 100%,
    0 98%,
    0 0,
    16% 0
  );
}

.darkslidecard-content {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: rgb(35, 35, 35);
}

/* texture */
.darkslidecard-content::before {
  pointer-events: none;
  content: "";
  background-image: url("/images/paper.png");
  background-size: cover;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  opacity: 0.5;
}

.darkslidecard-content-text {
  flex-grow: 1;
  padding: 8%;
  opacity: 0.9;
}

.darkslidecard-content-header {
  padding-top: 8%;
  padding-left: 50%;
  text-align: left;
  opacity: 0.8;
}

.darkslidecard-content-header > img {
  width: 1.7em;
  height: 1.7em;
  margin-right: 0.1em;
}

.darkslidecard-content-header > div {
  display: inline-block;
  white-space: pre-line;
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
  background-color: rgb(30, 30, 30);
  border-radius: 50%;
  border-color: rgba(255, 255, 255, 0.1);
  border-style: solid;
  border-width: 0 2px 2px 0;
}

.darkslidecard-content-footer-right {
  padding-bottom: 8%;
  text-align: left;
  opacity: 0.8;
}

.darkslidecard-content-footer-right > div {
  display: inline-block;
  margin-right: 1em;
  vertical-align: top;
  white-space: pre-line;
}

.darkslidecard-black-label {
  position: absolute;
  z-index: -1;
  top: -4%;
  left: 0;
  width: 11%;
  height: 5%;
  background-color: rgb(10, 10, 10);
}
</style>

<script>
export default {
  name: "DarkslideCard",
  props: ["card", "fontSize"],

  computed: {
    currentDate() {
      return (
        ("0" + (new Date().getMonth() + 1)).slice(-2) + // month
        "/" +
        new Date().getFullYear().toString().substr(-2) // year
      );
    },
    cssVars() {
      return {
        "--font-size": this.fontSize + "px",
        "--line-height": this.fontSize + "px",
      };
    },
  },
};
</script>

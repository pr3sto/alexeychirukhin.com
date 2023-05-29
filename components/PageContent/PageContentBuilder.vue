<template>
  <main class="page-content">
    <section
      class="page-content-section"
      v-for="(component, index) of components"
      :key="index"
      :style="composeCSS(component)"
      :class="{
        'page-content-section--fill-avaliable-space':
          component.styles.fillAvaliableSpace,
      }"
    >
      <component
        class="page-content-component"
        :class="{ 'fade-in': component.styles.enableFadeInTransition }"
        :is="component.content.type"
        :content="component.content"
      />
    </section>
  </main>
</template>

<style lang="scss" scoped>
@use "~/assets/scss/variables" as vars;

.page-content {
  display: flex;
  flex-direction: column;
}

.page-content-section {
  display: flex;

  &--fill-avaliable-space {
    overflow: hidden;
    flex: 1;
  }

  & > * {
    flex: 1;
  }
}

.page-content-component {
  transition: transform 0.8s ease-in-out, opacity 0.6s ease-in-out;
}

.out-of-view {
  opacity: 0;
  transform: translateY(50px);
}
</style>

<script>
import CardStack from "./CardStack/CardStack.vue";
import Photo from "./Photo/Photo.vue";
import PhotoGrid from "./Photo/PhotoGrid.vue";
import TextBlocks from "./TextBlocks/TextBlocks.vue";

export default {
  name: "PageContentBuilder",
  props: ["components"],
  components: { CardStack, Photo, PhotoGrid, TextBlocks },

  data() {
    return {
      observer: null,
    };
  },

  mounted() {
    const options = {
      root: null,
      rootMargin: "0% 0% -15% 0%",
      threshold: 0.1,
    };

    const intersectionCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove("out-of-view");
        } else {
          if (entry.boundingClientRect.top > 0) {
            console.log("BELOW");
            entry.target.classList.add("out-of-view");
          }
        }
      });
    };

    this.observer = new IntersectionObserver(intersectionCallback, options);

    document.querySelectorAll(".fade-in").forEach((element) => {
      this.observer.observe(element);
    });
  },

  beforeDestroy() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  },

  methods: {
    composeCSS(component) {
      return `padding: ${component.styles.offset.top} ${component.styles.offset.right} ${component.styles.offset.bottom} ${component.styles.offset.left};`;
    },
  },
};
</script>

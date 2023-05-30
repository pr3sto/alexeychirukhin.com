<template>
  <main class="page-content">
    <section
      class="page-content-section"
      :class="{
        'page-content-section--fill-avaliable-space':
          component.styles.fillAvaliableSpace,
      }"
      :style="composeCSS(component)"
      v-for="(component, index) of components"
      :key="index"
    >
      <component
        class="page-content-component"
        :class="{ 'fade-in': component.styles.fadeInTransition }"
        :is="component.content.type"
        :content="component.content"
        :ref="component.styles.fadeInTransition ? 'fadeInComponents' : ''"
        :data-fade-in-offset="
          component.styles.fadeInTransition?.triggerOffsetPercentage
        "
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

.fade-in {
  transition: opacity 0.6s ease-in-out, transform 0.8s ease-in-out;
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
      intersectionObservers: [],
    };
  },

  mounted() {
    if (!this.$refs["fadeInComponents"]) {
      return;
    }

    const elementsByOffset = this.$refs["fadeInComponents"].reduce(
      (dict, component) => {
        const key = component.$el.dataset.fadeInOffset;
        (dict[key] || (dict[key] = [])).push(component.$el);
        return dict;
      },
      {}
    );

    Object.entries(elementsByOffset).forEach(([fadeInOffset, elements]) => {
      this.observeElements(fadeInOffset, elements);
    });
  },

  beforeDestroy() {
    this.deleteObservers();
  },

  methods: {
    composeCSS(component) {
      return `padding: ${component.styles.offset.top} ${component.styles.offset.right} ${component.styles.offset.bottom} ${component.styles.offset.left};`;
    },
    observeElements(bottomOffset, elements) {
      const callback = (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // element appear on screen
            entry.target.classList.remove("out-of-view");
          } else if (entry.boundingClientRect.top > 0) {
            // element disappear from screen (below viewport)
            entry.target.classList.add("out-of-view");
          }
        });
      };

      const observer = new IntersectionObserver(callback, {
        root: null,
        rootMargin: `0% 0% -${bottomOffset}% 0%`,
        threshold: 0,
      });

      elements.forEach((el) => {
        observer.observe(el);
      });

      this.intersectionObservers.push(observer);
    },
    deleteObservers() {
      this.intersectionObservers.forEach((observer) => {
        observer.disconnect();
        observer = null;
      });
    },
  },
};
</script>

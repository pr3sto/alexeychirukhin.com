<template>
  <card-stack-sm :content="content" v-if="useMobileVersion" />
  <card-stack-lg :content="content" v-else />
</template>

<script>
import CardStackLg from "./CardStackLg.vue";
import CardStackSm from "./CardStackSm.vue";

export default {
  name: "CardStack",
  props: ["content"],
  components: { CardStackLg, CardStackSm },

  computed: {
    useMobileVersion() {
      return this.$services.settings.getUseMobileVersion();
    },
  },
};
</script>

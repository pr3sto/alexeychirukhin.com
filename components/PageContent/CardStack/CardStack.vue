<template>
  <card-stack-sm :content="content" v-if="useMobileVersion" />
  <card-stack-lg :content="content" v-else />
</template>

<script>
import CardStackSm from "./CardStackSm.vue";
import CardStackLg from "./CardStackLg.vue";

export default {
  name: "CardStack",
  props: ["content"],
  components: { CardStackSm, CardStackLg },

  computed: {
    useMobileVersion() {
      return this.$services.settings.getUseMobileVersion();
    },
  },
};
</script>

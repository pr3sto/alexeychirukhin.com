<script setup>
defineProps({
  error: {
    type: Error,
    required: true,
  },
});

// state
const config = useRuntimeConfig();
const errorCounter = useState("errorCounter", () => 0);

useHead({
  title: config.public.HEAD_TITLE,
});

errorCounter.value = errorCounter.value + 1;

// event handlers
const handleError = () => clearError({ redirect: "/" });
</script>

<template>
  <div class="error-page">
    <div class="error-page-container">
      <div v-if="error.statusCode === 404" class="error-page-content">
        <span class="code">{{ error.statusCode }}</span>
        <span class="message"
          >Either I have lost it or haven't made it yet.</span
        >
        <span class="link" @click="handleError">whatever</span>
      </div>
      <div v-else-if="error.statusCode === 500" class="error-page-content">
        <span class="code">{{ error.statusCode }}</span>
        <template v-if="errorCounter <= 5">
          <span class="message">Something is broken</span>
          <span class="link" @click="handleError">try to fix</span>
        </template>
        <template v-else>
          <span class="message">Something is broken <b>completely</b></span>
        </template>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.error-page {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  background: $general__color--white;
}

.error-page-container {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: $general__padding--default;
  background: center / contain no-repeat url(~/assets/images/error-bkg.jpg);
}

.error-page-content {
  display: flex;
  flex-direction: column;
  text-align: center;
  font-size: 1.5rem;
  color: $general__color--white;

  & .code {
    font-size: 3rem;
  }

  & .link {
    cursor: pointer;
    text-decoration: underline;
  }
}
</style>

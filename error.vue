<script setup>
const error = useError();
const handleError = () => clearError({ redirect: "/" });
</script>

<template>
  <div class="error-page">
    <div v-if="error && error.statusCode === 404" class="error-page-content">
      <span class="message">are you lost?</span>
      <span class="button" @click="handleError">go back to reality</span>
    </div>
    <div
      v-else-if="error && error.statusCode === 500"
      class="error-page-content"
    >
      <span class="message">something not working</span>
      <span class="button" @click="handleError"
        >click and see if that helped</span
      >
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
  align-items: center;
  justify-content: center;
  background: center / contain no-repeat url(~/assets/images/error.jpg);
}

.error-page-content {
  display: flex;
  flex-direction: column;
  text-align: center;
  font-size: 1.5em;
  color: $general__color--white;

  & .button {
    cursor: pointer;
    text-decoration: underline;
  }
}
</style>

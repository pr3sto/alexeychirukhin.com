<template>
  <div class="loading-overlay">
    <div>
      <p class="loading-overlay-text">loading...</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.loading-overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loading-overlay-text {
  font-size: 1.5rem;
  animation: dimmer 2s infinite;
  animation-delay: 1s;
  opacity: 0;
}

@keyframes dimmer {
  0% {
    opacity: 0;
  }

  50% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}
</style>

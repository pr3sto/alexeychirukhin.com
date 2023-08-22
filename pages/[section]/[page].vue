<script lang="ts" setup>
const route = useRoute();
</script>

<template>
  <div>
    <h1>Route: {{ route.path }}</h1>
    <h2>Section: {{ route.params.section }}; page: {{ route.params.page }};</h2>
  </div>
</template>

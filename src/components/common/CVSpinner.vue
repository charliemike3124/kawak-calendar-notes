<template>
  <div class="d-flex flex-column justify-center align-center max-height">
    <v-progress-circular indeterminate></v-progress-circular>
    <div class="mt-4">
      <slot>{{ text }}</slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "CVSpinner",
  props: {
    text: String,
  },
};
</script>

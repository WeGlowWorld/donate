<template>
  <div class="classic-card w-full rounded-lg shadow-lg overflow-hidden">
    <div class="classic-title p-4 text-2xl font-bold">
      {{ title }}
    </div>
    <div :class="contentClass">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: 'Card',
  props: {
    title: {
      type: String,
      required: true,
    },
    contentClass: {
      type: String,
      default: '',
    },
  },
});
</script>

<style scoped>
.classic-title {
  background-color: var(--t-title);
  color: var(--t-title-text);
}
.classic-card {
  background-color: var(--t-card);
  color: var(--t-card-text);
}
</style>

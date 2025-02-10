<template>
  <div class="modern-card w-full rounded-lg shadow-lg overflow-hidden">
    <div class="modern-title p-4 text-2xl font-bold">
      {{ title }}
    </div>
    <slot />
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
  },
});
</script>

<style scoped>
.modern-title {
  background-color: var(--t-title);
  color: var(--t-title-text);
}
.modern-card {
  background-color: var(--t-card);
  color: var(--t-card-text);
}
</style>

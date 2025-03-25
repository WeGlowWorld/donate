<template>
  <div>
    Testing
  </div>
</template>

<script lang="ts">
export default defineComponent({
  setup() {
    definePageMeta({
      layout: 'testing',
    });
    console.log('page setup');
  },
  mounted() {
    console.log('page mounted');
  },
});
</script>

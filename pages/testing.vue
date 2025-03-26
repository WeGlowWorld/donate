<template>
  <div>
    Testing
  </div>
</template>

<script lang="ts" setup>
import type { Content } from '~/models/content';

const content = await useApiTest<Content>(`content-4H3OBDBO`, '/campaign/content/feestvarken-vzw/4H3OBDBO');
definePageMeta({
  layout: 'testing',
});
if (content) {
  useServerSeoMeta({
    title: content.org.slug,
  });
}
</script>

<template>
  <link
    rel="preconnect"
    href="https://fonts.googleapis.com"
  >
  <link
    rel="preconnect"
    href="https://fonts.gstatic.com"
  >
  <link
    href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Titillium+Web:ital,wght@0,200;0,300;0,400;0,600;0,700;0,900;1,200;1,300;1,400;1,600;1,700&display=swap"
    rel="stylesheet"
  >
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script lang="ts">
import 'primeicons/primeicons.css';

export default defineComponent({
  setup() {
    if (!useRoute().params.orgSlug) {
      useRouter().push('/404');
    }

    useSeoMeta({
      title: 'WeGlow Donate',
    });
  },
});
</script>

<style>
:root {
  font-family: 'Titillium Web';
}
</style>

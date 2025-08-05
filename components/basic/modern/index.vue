<template>
  <div
    id="basic-modern"
    class="flex-1 flex flex-col"
  >
    <basic-header />
    <div
      id="content"
      class="flex flex-col mx-auto w-full gap-x-8 gap-y-16 xl:grid max-w-[90rem] py-16 px-4"
    >
      <basic-modern-description />
      <basic-modern-map v-if="$route.params.campaignSlug !== 'IZH2QPMO'" />
      <basic-classic-links />
      <basic-classic-extra />
    </div>
    <basic-footer />
  </div>
</template>

<style scoped>
#basic-modern {
  background-color: var(--t-background);
  color: var(--t-text);
}
</style>

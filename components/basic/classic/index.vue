<template>
  <div
    id="basic-classic"
    class="flex-1 flex flex-col"
  >
    <basic-header />
    <div
      id="content"
      class="flex flex-col mx-auto w-full gap-8 xl:grid grid-cols-3 max-w-[75rem] py-16 px-4"
    >
      <basic-classic-description class="mx-auto xl:mx-0 col-span-3" />
      <basic-classic-donate class="mx-auto xl:mx-0 col-span-3" />
      <basic-classic-map class="col-span-2" />
      <basic-classic-messages />
      <basic-classic-links class="col-span-3" />
      <basic-classic-extra class="col-span-3" />
    </div>
    <basic-footer />
  </div>
</template>

<style scoped>
#basic-classic {
  background-color: var(--t-background);
  color: var(--t-text);
}
</style>

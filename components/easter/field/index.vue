<template>
  <div>
    <div class="easter">
      <div class="fixed bottom-40 left-4 top-1/2 z-40 text-white">
        Left
      </div>
      <div class="fixed bottom-40 right-4 top-1/2 z-40 text-white">
        Right
      </div>
      <div class="easter__field" />
    </div>
    <div class="relative z-10 top-[90vh] h-96 w-full bg-white">
      Hello
    </div>
  </div>
</template>

<style scoped>
.easter {
  @apply bg-sky-500 h-screen w-screen fixed flex flex-col justify-end top-0 left-0 overflow-x-auto;
}

.easter__field {
  background: linear-gradient(450deg, #06a939 0%, #09822b 100%);
  @apply relative bg-green-600 w-[300vw] h-3/4 shadow-lg;
}
</style>

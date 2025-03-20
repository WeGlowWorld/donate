<template>
  <div>
    <div
      ref="easter"
      class="easter"
    >
      <span
        v-if="position !== 'left'"
        class="arrow left-4 pi pi-angle-left"
      />
      <span
        v-if="position !== 'right'"
        class="arrow right-4 pi pi-angle-right"
      />
      <div class="easter__field">
        <easter-field-donations />
      </div>
    </div>
    <easter-field-donate />
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: 'EasterTemplate',
  setup() {
    return {
      easterField: useTemplateRef<HTMLDivElement>('easter'),
    };
  },
  data() {
    return {
      position: 'center',
    };
  },
  mounted() {
    if (!this.easterField) return;
    this.easterField.scrollLeft = this.easterField.scrollWidth / 2 - this.easterField.clientWidth / 2;
    this.easterField.addEventListener('scroll', () => {
      if (!this.easterField) return;
      if (this.easterField.scrollLeft < 100) this.position = 'left';
      else if (this.easterField.scrollLeft > this.easterField.scrollWidth - this.easterField.clientWidth - 100) this.position = 'right';
      else this.position = 'center';
    });
  },
});
</script>

<style>
.easter {
  @apply bg-sky-500 h-screen w-screen fixed flex flex-col justify-end top-0 left-0 overflow-x-scroll;
}

.easter__field {
  background: linear-gradient(450deg, lightgreen 0%, darkgreen 100%);
  @apply relative bg-green-600 w-[300vw] h-2/3 mb-24 shadow-[rgba(0,0,15,0.5)_0px_0px_16px_0px] z-0;
}
.easter .arrow {
  font-size: 2.5em !important;
  @apply fixed bottom-40 top-1/2 z-40 h-fit w-fit text-white;
}
</style>

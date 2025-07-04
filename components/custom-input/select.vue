<template>
  <form-field
    v-slot="$field"
    :name="name"
    :initial-value="modelValue"
    class="relative"
  >
    <label
      v-if="name"
      class="font-semibold"
      :for="name"
    >{{ $t(`fields.${name}.name`) }} {{ required ? '*' : '' }}</label>
    <PrimeSelect
      :value="modelValue"
      :name="name"
      :options="options"
      option-label="label"
      option-value="value"
      :filter="filter"
      fluid
      size="small"
      show-clear
      @change="onChange"
    />
    <Message
      v-if="$field?.invalid"
      severity="error"
      size="small"
      variant="simple"
    >
      {{ $t(`fields.${name}.errors.${$field.error}`) }}
    </Message>
  </form-field>
</template>

<script lang="ts">
import type { SelectChangeEvent } from 'primevue';
import { defineComponent, type PropType } from 'vue';
import PrimeSelect from 'primevue/select';

export default defineComponent({
  name: 'SelectInput',
  components: {
    PrimeSelect,
  },
  props: {
    name: {
      type: String,
      required: false,
    },
    modelValue: {
      type: String,
      required: false,
    },
    options: {
      type: Object as PropType<{ label: string; value: string }[]>,
      required: true,
    },
    required: {
      type: Boolean,
      default: false,
    },
    filter: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['update:modelValue'],
  methods: {
    onChange(event: SelectChangeEvent) {
      if (event.value !== this.modelValue) {
        this.$emit('update:modelValue', event.value);
      }
    },
  },
});
</script>

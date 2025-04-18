<template>
  <!-- <form-field
    v-slot="$field"
    :name="name"
    :initial-value="modelValue"
    class="relative"
  > -->
  <!-- <label
      class="italic"
      :for="name"
    >{{ $t(`fields.${name}.name`) }} {{ required ? '*' : '' }}</label> -->
  <!-- <prime-slider
    :model-value="modelValue"
    :name="name"
    size="large"
    fluid
    allow-empty
    @input="onInput"
  /> -->
  <prime-slider
    :model-value="modelValue"
    class="w-56"
  />
  <!-- <Message
      v-if="$field?.invalid"
      severity="error"
      size="small"
      variant="simple"
    >
      {{ $t(`fields.${name}.errors.${$field.error?.message}`) }}
    </Message> -->
  <!-- </form-field> -->
</template>

<script lang="ts">
import { Slider as PrimeSlider, type InputNumberInputEvent } from 'primevue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TextInput',
  components: {
    PrimeSlider,
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    modelValue: {
      type: Number,
      required: false,
    },
    required: {
      type: Boolean,
      default: false,
    },
    positive: {
      type: Boolean,
      default: false,
    },
    showButtons: {
      type: Boolean,
      default: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue'],
  methods: {
    onInput(newVal: InputNumberInputEvent) {
      if (newVal.value == null) {
        this.$emit('update:modelValue', undefined);
        return;
      }
      this.$emit('update:modelValue', newVal.value);
    },
  },
});
</script>

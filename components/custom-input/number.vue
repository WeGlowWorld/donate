<template>
  <form-field
    v-slot="$field"
    :name="name"
    :initial-value="modelValue"
    class="relative"
  >
    <label
      class="italic"
      :for="name"
    >{{ $t(`fields.${name}.name`) }} {{ required ? '*' : '' }}</label>
    <input-number
      :model-value="modelValue"
      :name="name"
      size="large"
      type="text"
      fluid
      allow-empty
      :min="positive ? 0 : undefined"
      show-buttons
      :max-fraction-digits="2"
      :locale="$i18n.locale"
      @input="onInput"
    />
    <Message
      v-if="$field?.invalid"
      severity="error"
      size="small"
      variant="simple"
    >
      {{ $t(`fields.${name}.errors.${$field.error?.message}`) }}
    </Message>
  </form-field>
</template>

<script lang="ts">
import type { InputNumberInputEvent } from 'primevue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TextInput',
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

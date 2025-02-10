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
    <input-text
      :value="modelValue"
      :name="name"
      size="large"
      type="text"
      fluid
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
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TextInput',
  props: {
    name: {
      type: String,
      required: true,
    },
    modelValue: {
      type: String,
      required: true,
    },
    required: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue'],
  methods: {
    onInput(event: Event) {
      const target = event.target as HTMLInputElement; // Cast to HTMLInputElement
      if (target) {
        this.$emit('update:modelValue', target.value);
      }
    },
  },
});
</script>

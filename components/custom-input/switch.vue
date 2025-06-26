<template>
  <form-field
    v-slot="$field"
    :name="name"
    :initial-value="modelValue"
    class="relative"
  >
    <div
      class="flex items-center gap-2"
      :class="reverse ? 'flex-row-reverse justify-end' : ''"
    >
      <label
        class="font-semibold"
        :for="name"
      >{{ $t(`fields.${name}.name`) }}</label>
      <toggle-switch
        :value="modelValue"
        :name="name"
        @value-change="onChange"
      />
    </div>
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
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SwitchInput',
  props: {
    name: {
      type: String,
      required: true,
    },
    modelValue: {
      type: Boolean,
      required: false,
    },
    reverse: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue'],
  methods: {
    onChange(value: boolean) {
      this.$emit('update:modelValue', value);
    },
  },
});
</script>

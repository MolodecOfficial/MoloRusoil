<script setup lang="ts">
const props = defineProps({
  modelValue: String,
  placeholder: String,
  width: String,
  borderRadius: String,
  height: String,
  type: String,
  backgroundColor: String,
  color: String,
});

const emit = defineEmits(['update:modelValue', 'send']);

const handleInput = (event: Event) => {
  const value = (event.target as HTMLInputElement).value;
  emit('update:modelValue', value);
};


const handleKeyPress = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    const target = event.target as HTMLInputElement;

    if (event.shiftKey) {
      const newValue = target.value + '\n';
      emit('update:modelValue', newValue);
      target.value = newValue;
    } else {
      emit('send', target.value);
      emit('update:modelValue', '');
    }
  }
};
</script>

<template>
  <input
      :type="type"
      @input="handleInput"
      :value="modelValue"
      :placeholder="placeholder"
      :style="{
        width: width,
        borderRadius: borderRadius,
        height: height,
        backgroundColor: backgroundColor,
        color: color
        }"
      @keydown="handleKeyPress"
  ><slot></slot>

</template>

<style scoped>

input {
  padding: 10px;
  border-radius: 4px;
  background-color: #2c2c2c;
  border: none;
  color: white;
  box-sizing: border-box;
  &:focus {
    outline: 1px solid #4b4b4b;
    outline-offset: 2px;
  }
}
input[type="date"] {
  padding: 10px;
  border-radius: 4px;
  background-color: #2c2c2c;
  border: none;
  color: white;
  box-sizing: border-box;
  font-family: inherit;
  font-size: inherit;

  &::-webkit-calendar-picker-indicator {
    filter: invert(1);
    cursor: pointer;
  }

  &:focus {
    outline: 1px solid #4b4b4b;
    outline-offset: 2px;
  }
}
</style>
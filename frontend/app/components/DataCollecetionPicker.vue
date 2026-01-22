<template>
  <div class="row">
    <label>
      Collection:
      <select :value="modelValue" @change="$emit('update:modelValue', $event.target.value)">
        <option value="users">users</option>
        <option value="projects">projects</option>
        <option value="tasks">tasks</option>
      </select>
    </label>

    <button @click="$emit('reload')">Reload</button>
  </div>
</template>

<script setup>
defineProps({ modelValue: String })
defineEmits(['update:modelValue', 'reload'])
</script>

<style scoped>
.row {
  display: flex;
  gap: 12px;
  align-items: center;
  margin-bottom: 16px;
}
</style>

<template>
  <section class="card">
    <h2>Items (last 50)</h2>

    <div v-if="loading">Loading...</div>
    <div v-else-if="items.length === 0">No items yet.</div>

    <ul v-else class="list">
      <li v-for="it in items" :key="it.id" class="row">
        <div>
          <b>{{ it.title || '(no title)' }}</b>
          <div class="sub">id: {{ it.id }}</div>
        </div>

        <button @click="$emit('remove', it.id)">Delete</button>
      </li>
    </ul>
  </section>
</template>

<script setup>
defineProps({
  items: Array,
  loading: Boolean,
})
defineEmits(['remove'])
</script>

<style scoped>
.card {
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  padding: 16px;
}
.list { list-style: none; padding: 0; margin: 0; }
.row {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}
.sub { font-size: 12px; opacity: 0.7; }
</style>

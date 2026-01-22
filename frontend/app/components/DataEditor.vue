<template>
  <section class="card">
    <h2>Create</h2>

    <label class="field">
      Title
      <input v-model="title" placeholder="Title..." />
    </label>

    <label class="field">
      JSON object (optional)
      <textarea v-model="jsonText" placeholder='{"projectId":"..."}'></textarea>
    </label>

    <button @click="onCreate">Create</button>

    <p v-if="error" class="error">{{ error }}</p>
    <p v-if="createdId" class="ok">Created: {{ createdId }}</p>
  </section>
</template>

<script setup>
const props = defineProps({
  collection: { type: String, required: true },
  create: { type: Function, required: true },
})

const title = ref('')
const jsonText = ref('')
const error = ref('')
const createdId = ref('')

const parseJsonObject = (txt) => {
  const t = (txt || '').trim()
  if (!t) return {}
  const parsed = JSON.parse(t)
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
    throw new Error('JSON must be an object like {"key":"value"}')
  }
  return parsed
}

const onCreate = async () => {
  error.value = ''
  createdId.value = ''

  try {
    const extra = parseJsonObject(jsonText.value)
    const id = await props.create(props.collection, {
      title: title.value.trim(),
      ...extra,
    })
    createdId.value = id
    title.value = ''
    jsonText.value = ''
  } catch (e) {
    error.value = e?.message || 'Create failed'
  }
}
</script>

<style scoped>
.card {
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  padding: 16px;
}
.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 12px;
}
textarea {
  min-height: 110px;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace;
  font-size: 12px;
}
.error { color: #b00020; }
.ok { color: #0a7b2a; }
</style>

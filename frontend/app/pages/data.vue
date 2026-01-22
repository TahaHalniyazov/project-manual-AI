<template>
  <div>
    <h1>Data Manager (RTDB Emulator)</h1>

    <DataCollectionPicker v-model="collection" @reload="reload" />

    <div class="grid">
      <DataEditor :collection="collection" :create="createItem" />
      <DataList :items="items" :loading="loading" @remove="removeItem" />
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'app' })

import { rtdbRepo } from '~/services/rtdbRepo'

const collection = ref('users')
const items = ref([])
const loading = ref(true)

let unsub = null

const subscribe = () => {
  loading.value = true
  if (unsub) unsub()
  unsub = rtdbRepo.subscribe(collection.value, (list) => {
    items.value = list
    loading.value = false
  })
}

const reload = () => subscribe()

watch(collection, () => subscribe(), { immediate: true })

onBeforeUnmount(() => {
  if (unsub) unsub()
})

const createItem = (col, payload) => rtdbRepo.create(col, payload)
const removeItem = (id) => rtdbRepo.remove(collection.value, id)

</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
</style>

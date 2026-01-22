<template>
  <div>
    <header class="header">
      <nav class="nav">
        <NuxtLink v-for="l in links" :key="l.to" :to="l.to" class="link">
          {{ l.label }}
        </NuxtLink>
      </nav>
    </header>

    <main class="main">
      <slot />
    </main>
  </div>
</template>

<script setup>
const { links } = useAppMenu()
</script>

<style scoped>
.header {
  border-bottom: 1px solid #e5e5e5;
  padding: 12px 16px;
}

.nav {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.link {
  text-decoration: none;
  color: #111;
  padding: 6px 10px;
  border-radius: 8px;
  border: 1px solid transparent;
}

.link:hover {
  border-color: #ddd;
  background: #fafafa;
}

.main {
  padding: 16px;
}
</style>

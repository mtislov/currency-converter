<script setup lang="ts">
import Header from "./components/Header.vue";
</script>

<template>
  <div class="app">
    <Header />
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<style>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}
</style>

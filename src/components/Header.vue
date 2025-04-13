<script setup lang="ts">
import { ref } from "vue";
import CurrencySelect from "./CurrencySelect.vue";

const baseCurrency = ref("RUB");

const updateBaseCurrency = (currency: string) => {
  baseCurrency.value = currency;
};
</script>

<template>
  <header class="header">
    <nav>
      <router-link to="/" class="nav-link">Главная</router-link>
      <router-link to="/convert" class="nav-link">Конвертация</router-link>
      <CurrencySelect @update:modelValue="updateBaseCurrency" />
    </nav>
  </header>
</template>

<style scoped>
.header {
  background-color: #f8f9fa;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

nav {
  display: flex;
  gap: 1rem;
  max-width: 1200px;
  margin: 0 auto;
  align-items: center;
}

.nav-link {
  text-decoration: none;
  color: #333;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.nav-link:hover {
  background-color: #e9ecef;
}

.router-link-active {
  background-color: #e9ecef;
  color: #0d6efd;
}
</style>

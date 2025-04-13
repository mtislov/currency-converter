<script setup lang="ts">
import { onMounted } from "vue";
import { useCurrencyStore } from "../stores/currencyStore";

const store = useCurrencyStore();

onMounted(() => {
  store.fetchRates();
});
</script>

<template>
  <div class="home">
    <h1>Курсы валют</h1>

    <div v-if="store.loading" class="loading">Загрузка курсов валют...</div>

    <div v-else-if="store.error" class="error">
      {{ store.error }}
    </div>

    <div v-else class="rates">
      <div v-for="rate in store.formattedRates" :key="rate.code" class="rate-item">
        <span class="currency-code">1 {{ rate.code }}</span>
        <span class="equals">=</span>
        <span class="rate-value">{{ rate.rate.toFixed(3) }} {{ store.baseCurrency }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
}

h1 {
  color: #333;
  margin-bottom: 2rem;
  text-align: center;
}

.rates {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 400px;
  margin: 0 auto;
}

.rate-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.currency-code {
  font-weight: 600;
  color: #333;
}

.equals {
  color: #6c757d;
  margin: 0 1rem;
}

.rate-value {
  color: #0d6efd;
  font-weight: 500;
}

.loading,
.error {
  text-align: center;
  padding: 2rem;
  color: #6c757d;
}

.error {
  color: #dc3545;
}
</style>

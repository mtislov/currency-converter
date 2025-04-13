<script setup lang="ts">
import { useCurrencyStore } from "../stores/currencyStore";

const store = useCurrencyStore();

const handleChange = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  store.setBaseCurrency(target.value);
};
</script>

<template>
  <select class="currency-select" :value="store.baseCurrency" @change="handleChange">
    <option value="USD">USD</option>
    <option value="EUR">EUR</option>
    <option value="RUB">RUB</option>
  </select>
</template>

<style scoped>
.currency-select {
  padding: 0.5rem;
  border: 1px solid #ced4da;
  border-radius: 4px;
  background-color: white;
  font-size: 1rem;
  cursor: pointer;
  margin-left: auto;
}

.currency-select:hover {
  border-color: #0d6efd;
}

.currency-select:focus {
  outline: none;
  border-color: #0d6efd;
  box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, 0.25);
}
</style>

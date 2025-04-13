<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import { useCurrencyStore } from "../stores/currencyStore";

const store = useCurrencyStore();

// Доступные валюты
const currencies = ["USD", "EUR", "RUB", "BRL", "KZT", "IDR"];

// Состояние формы
const fromCurrency = ref("RUB");
const toCurrency = ref("USD");
const fromAmount = ref(1000);
const toAmount = ref(0);

// Загружаем курсы при монтировании компонента
onMounted(async () => {
  await store.fetchRates();
  updateToAmount();
});

// Функция для получения курса между двумя валютами
const getExchangeRate = (from: string, to: string) => {
  // Если валюты одинаковые, возвращаем 1
  if (from === to) return 1;

  // Ищем прямой курс
  const directKey = `${from.toLowerCase()}-${to.toLowerCase()}`;
  if (store.allExchangeRates[directKey]) {
    return store.allExchangeRates[directKey];
  }

  // Ищем обратный курс
  const reverseKey = `${to.toLowerCase()}-${from.toLowerCase()}`;
  if (store.allExchangeRates[reverseKey]) {
    return 1 / store.allExchangeRates[reverseKey];
  }

  // Если не нашли прямой или обратный курс, возвращаем 1
  return 1;
};

// Функция обновления суммы в целевом поле
const updateToAmount = () => {
  const rate = getExchangeRate(fromCurrency.value, toCurrency.value);
  toAmount.value = Number((fromAmount.value * rate).toFixed(2));
};

// Функция обновления суммы в исходном поле
const updateFromAmount = () => {
  const rate = getExchangeRate(toCurrency.value, fromCurrency.value);
  fromAmount.value = Number((toAmount.value * rate).toFixed(2));
};

// Следим за изменениями валют
watch([fromCurrency, toCurrency], () => {
  updateToAmount();
});

// Следим за изменениями базовой валюты в хранилище
watch(() => store.baseCurrency, async () => {
	await store.fetchRates();
	updateToAmount();
});
</script>

<template>
  <div class="convert">
    <h1>Конвертация валют</h1>

    <div v-if="store.loading" class="loading">Загрузка курсов валют...</div>

    <div v-else-if="store.error" class="error">
      {{ store.error }}
    </div>

    <div v-else class="converter-form">
      <div class="form-row">
        <div class="form-group">
          <label for="from-currency">Из валюты:</label>
          <select id="from-currency" v-model="fromCurrency" class="form-control">
            <option v-for="currency in currencies" :key="currency" :value="currency">
              {{ currency }}
            </option>
          </select>
        </div>

        <div class="form-group">
          <label for="from-amount">Сумма:</label>
          <input
            id="from-amount"
            type="number"
            v-model="fromAmount"
            @input="updateToAmount"
            class="form-control"
            min="0"
            step="0.01"
          />
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="to-currency">В валюту:</label>
          <select id="to-currency" v-model="toCurrency" class="form-control">
            <option v-for="currency in currencies" :key="currency" :value="currency">
              {{ currency }}
            </option>
          </select>
        </div>

        <div class="form-group">
          <label for="to-amount">Результат:</label>
          <input
            id="to-amount"
            type="number"
            v-model="toAmount"
            @input="updateFromAmount"
            class="form-control"
            min="0"
            step="0.01"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.convert {
  max-width: 800px;
  margin: 2rem auto;
  padding: 0 1rem;
}

h1 {
  color: #333;
  margin-bottom: 2rem;
  text-align: center;
}

.converter-form {
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form-row {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.form-group {
  flex: 1;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #333;
}

.form-control {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.form-control:hover {
  border-color: #0d6efd;
}

.form-control:focus {
  outline: none;
  border-color: #0d6efd;
  box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, 0.25);
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

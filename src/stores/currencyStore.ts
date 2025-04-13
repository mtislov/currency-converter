import {defineStore} from "pinia";
import {computed, ref} from "vue";
import {getCurrencyData} from "../services/currencyService";
import type {ExchangeRates} from "../types/currency";
import {formatCurrencyRates} from "../services/currencyFormatter";

export const useCurrencyStore = defineStore("currency", () => {
  const baseCurrency = ref("RUB");
  const allExchangeRates = ref<ExchangeRates>({});
  const loading = ref(true);
  const error = ref("");

  const formattedRates = computed(() => {
    return formatCurrencyRates(allExchangeRates.value, baseCurrency.value);
  });

  const setBaseCurrency = async (currency: string) => {
    baseCurrency.value = currency;
    await fetchRates();
  };

  const fetchRates = async () => {
    try {
      allExchangeRates.value = await getCurrencyData();
    } catch (e) {
      error.value = "Ошибка при загрузке курсов валют";
      console.error(e);
    } finally {
      loading.value = false;
    }
  };

  return {
    baseCurrency,
    allExchangeRates,
    formattedRates,
    loading,
    error,
    setBaseCurrency,
    fetchRates,
  };
});

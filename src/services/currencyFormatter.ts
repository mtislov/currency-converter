import type { CurrencyRate, ExchangeRates } from "../types/currency";

export function formatCurrencyRates(data: ExchangeRates, baseCurrency: string): CurrencyRate[] {
  const rates: CurrencyRate[] = [];

  for (const key in data) {
    const [fromCurrency, toCurrency] = key.split("-");
    if (toCurrency.toLowerCase() === baseCurrency.toLowerCase()) {
      rates.push({
        code: fromCurrency.toUpperCase(),
        rate: Number(data[key].toFixed(3)),
      });
    }
  }

  return rates;
} 
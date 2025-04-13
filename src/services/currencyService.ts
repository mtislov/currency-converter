import type {ExchangeRates} from "../types/currency";

export async function getCurrencyData(): Promise<ExchangeRates> {
  try {
    const response = await fetch("https://status.neuralgeneration.com/api/currency");
    return await response.json();
  } catch (error) {
    console.error("Ошибка при получении курсов валют:", error);
    return {};
  }
}

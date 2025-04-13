export interface CurrencyRate {
  code: string;
  rate: number;
}

export interface ExchangeRates {
  [key: string]: number;
} 
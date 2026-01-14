import { currencyCodesWithFlags } from 'enities/currency'

type FormatCurrency = (currency: string) => string

export const formatCurrency: FormatCurrency = (currency) => {
  if (currency in currencyCodesWithFlags) {
    return `${currencyCodesWithFlags[currency]}`
  }

  return currency
}

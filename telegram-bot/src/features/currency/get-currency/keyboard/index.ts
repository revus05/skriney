import { InlineKeyboard } from 'grammy'
import { $Enums } from '@prisma/client'
import { formatCurrency } from 'shared/lib'

export const getCurrenciesKeyboard = async () => {
  const currenciesKeyboard = new InlineKeyboard()

  let index = 0
  for (const currency in $Enums.Currency) {
    currenciesKeyboard.text(formatCurrency(currency), currency)
    if (++index % 3 === 0) {
      currenciesKeyboard.row()
    }
  }

  return currenciesKeyboard
}

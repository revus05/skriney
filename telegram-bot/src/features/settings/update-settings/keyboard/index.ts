import { InlineKeyboard } from 'grammy'
import type { User } from '@prisma/client'

export const userSettingsKeyboard = (user: User) => {
  const userSettingsKeyboard = new InlineKeyboard()
  userSettingsKeyboard.row()
  userSettingsKeyboard.text(
    `Использовать категорию по умолчанию: ${user.useDefaultCategory ? 'ВКЛ' : 'ВЫКЛ'}`,
    `use-default-category-${user.useDefaultCategory ? 'off' : 'on'}`,
  )
  userSettingsKeyboard.row()
  userSettingsKeyboard.text(
    `Использовать счет по умолчанию ${user.useDefaultBankAccount ? 'ВКЛ' : 'ВЫКЛ'}`,
    `use-default-bank-account-${user.useDefaultBankAccount ? 'off' : 'on'}`,
  )
  userSettingsKeyboard.row()
  userSettingsKeyboard.text(
    `Использовать валюту по умолчанию ${user.useDefaultCurrency ? 'ВКЛ' : 'ВЫКЛ'}`,
    `use-default-currency-${user.useDefaultCurrency ? 'off' : 'on'}`,
  )
  userSettingsKeyboard.row()
  userSettingsKeyboard.text(`Назад`, `back`)

  return userSettingsKeyboard
}

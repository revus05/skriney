'use client'

import { Select, SelectItem } from 'shared/ui'
import { Currency, CurrencySymbols } from 'shared/constants/currencies'
import { useState } from 'react'
import { useUpdateDefaultCurrencySubmit } from '../model'
import { useAppSelector } from 'shared/lib'
import { useTranslation } from 'shared/i18n'

export const UpdateDefaultCurrencySelect = () => {
  const updateDefaultCurrency = useUpdateDefaultCurrencySubmit()

  const defaultCurrency =
    useAppSelector(
      (state) => state.userSlice.user?.userSettings.defaultCurrency,
    ) || Currency.USD

  const [selectedCurrency, setSelectedCurrency] =
    useState<keyof typeof Currency>(defaultCurrency)

  const handleSelectCurrencyChange = (currency: keyof typeof Currency) => {
    setSelectedCurrency(currency)
    void updateDefaultCurrency({ currency })
  }

  const t = useTranslation()

  return (
    <Select
      label={'default-currency'}
      className={'w-[150px]'}
      placeholder={t('settings.list.defaultCurrency')}
      value={selectedCurrency}
      onValueChangeAction={handleSelectCurrencyChange}
    >
      {Object.entries(CurrencySymbols).map(([key, symbol]) => (
        <SelectItem key={key}>
          {symbol === key ? key : `${symbol} ${key}`}
        </SelectItem>
      ))}
    </Select>
  )
}

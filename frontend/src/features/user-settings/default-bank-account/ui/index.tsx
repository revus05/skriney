'use client'

import { Select, SelectItem } from 'shared/ui'
import { useState } from 'react'
import { useUpdateDefaultBankAccountSubmit } from '../model'
import { useAppSelector } from 'shared/lib'
import { useTranslation } from 'shared/i18n'
import { useGetBankAccounts } from 'entities/bank-account'

export const UpdateDefaultBankAccountSelect = () => {
  const updateDefaultBankAccount = useUpdateDefaultBankAccountSubmit()
  const bankAccounts = useGetBankAccounts()

  const defaultBankAccount =
    useAppSelector(
      (state) => state.userSlice.user?.userSettings?.defaultBankAccount,
    ) || null

  const [selectedBankAccount, setSelectedBankAccount] = useState<string>(
    defaultBankAccount?.uuid || '',
  )

  const handleSelectBankAccountChange = (newValue: string) => {
    setSelectedBankAccount(newValue)
    void updateDefaultBankAccount({ uuid: newValue })
  }

  const displayBankAccount =
    defaultBankAccount &&
    !bankAccounts.some((c) => c.uuid === defaultBankAccount.uuid)
      ? [...bankAccounts, defaultBankAccount]
      : bankAccounts

  const t = useTranslation()

  return (
    <Select
      label={'default-category'}
      className={'w-45'}
      placeholder={t('settings.list.defaultBankAccount')}
      value={selectedBankAccount}
      onValueChangeAction={handleSelectBankAccountChange}
    >
      {displayBankAccount.map((bankAccount) => (
        <SelectItem key={bankAccount.uuid}>
          {bankAccount.emoji
            ? `${bankAccount.emoji} ${bankAccount.title}`
            : bankAccount.title}
        </SelectItem>
      ))}
    </Select>
  )
}

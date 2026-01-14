'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CreateTransactionFormData, createTransactionSchema } from './schema'
import { useAppSelector } from 'shared/lib'
import { useTranslation } from 'shared/i18n'

export const useCreateTransactionForm = () => {
  const userSettings = useAppSelector(
    (state) => state.userSlice.user?.userSettings,
  )

  const t = useTranslation()

  return useForm<CreateTransactionFormData>({
    resolver: zodResolver(createTransactionSchema(t)),
    defaultValues: {
      categoryUuid: userSettings?.defaultCategory?.uuid || '',
      bankAccountUuid: userSettings?.defaultBankAccount?.uuid || '',
      amount: '',
      currency: userSettings?.defaultCurrency,
      description: '',
    },
    mode: 'onSubmit',
  })
}

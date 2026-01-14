'use client'

import { CreateBankAccountFormData } from './schema'
import { useCreateBankAccount } from 'entities/bank-account'
import { Currency } from 'shared/constants/currencies'

export const useCreateBankAccountSubmit = (onSuccess?: () => void) => {
  const { onSubmit, isLoading } = useCreateBankAccount()

  return {
    onSubmit: async (data: CreateBankAccountFormData) => {
      await onSubmit({
        ...data,
        currency: data.currency as keyof typeof Currency,
        initialBalance: +data.initialBalance,
      })

      if (onSuccess) onSuccess()
    },
    isLoading,
  }
}

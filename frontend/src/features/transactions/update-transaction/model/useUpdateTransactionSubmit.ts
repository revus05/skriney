'use client'

import { UpdateTransactionFormData } from 'features/transactions/update-transaction/model/schema'
import { useUpdateTransaction } from 'entities/transaction'
import { Currency } from 'shared/constants/currencies'

export const useUpdateTransactionSubmit = (
  uuid: string,
  onSuccess?: () => void,
) => {
  const updateCategory = useUpdateTransaction()

  return async (data: UpdateTransactionFormData) => {
    await updateCategory(uuid, {
      ...data,
      amount:
        data.amount[0] === '+'
          ? +data.amount
          : data.amount[0] === '-'
            ? +data.amount
            : +`-${data.amount}`,
      currency: data.currency as keyof typeof Currency,
    })

    if (onSuccess) onSuccess()
  }
}

import { CreateTransactionFormData } from './schema'
import { Currency } from 'shared/constants/currencies'
import { useCreateTransaction } from 'entities/transaction'

export const useCreateTransactionSubmit = (onSuccess?: () => void) => {
  const { onSubmit, isLoading } = useCreateTransaction()

  return {
    onSubmit: async (data: CreateTransactionFormData) => {
      await onSubmit({
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
    },
    isLoading,
  }
}

'use client'

import { UpdateBankAccountFormData } from './schema'
import { useUpdateBankAccount } from 'entities/bank-account'

export const useUpdateBankAccountSubmit = (
  uuid: string,
  onSuccess?: () => void,
) => {
  const updateBankAccount = useUpdateBankAccount()

  return async (data: UpdateBankAccountFormData) => {
    await updateBankAccount(uuid, data)

    if (onSuccess) onSuccess()
  }
}

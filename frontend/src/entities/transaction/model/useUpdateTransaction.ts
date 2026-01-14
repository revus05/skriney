'use client'

import { useAppDispatch } from 'shared/lib'
import { getApiError, UpdateTransactionRequestDTO } from 'shared/api'
import {
  positiveUpdateTransaction,
  updateTransaction,
  useUpdateTransactionMutation,
} from 'entities/transaction'
import { updateTransactionModalOpenFn } from 'features/transactions/update-transaction'

export const useUpdateTransaction = () => {
  const [updateTransactionFn] = useUpdateTransactionMutation()
  const dispatch = useAppDispatch()

  return async (uuid: string, body: UpdateTransactionRequestDTO) => {
    try {
      dispatch(positiveUpdateTransaction({ ...body, uuid }))
      dispatch(updateTransactionModalOpenFn(false))
      const res = await updateTransactionFn({ uuid, body }).unwrap()
      if (res && res.data) {
        dispatch(updateTransaction(res.data))
      }
    } catch (error) {
      const err = getApiError<Record<string, string>>(error)
      console.log(err)
    }
  }
}

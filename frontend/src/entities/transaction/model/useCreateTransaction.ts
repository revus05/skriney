import { useAppDispatch } from 'shared/lib'
import { CreateTransactionRequestDTO, getApiError } from 'shared/api'
import { useCreateTransactionMutation } from '../api'
import { addTransaction } from '../model'

export const useCreateTransaction = () => {
  const [createTransaction, { isLoading }] = useCreateTransactionMutation()
  const dispatch = useAppDispatch()

  return {
    onSubmit: async (data: CreateTransactionRequestDTO) => {
      try {
        const res = await createTransaction(data).unwrap()
        if (res && res.data) {
          dispatch(addTransaction(res.data))
        }
      } catch (error) {
        const err = getApiError<Record<string, string>>(error)
        console.log(err)
      }
    },
    isLoading,
  }
}

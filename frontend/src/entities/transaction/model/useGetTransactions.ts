import { useGetTransactionsMutation } from '../api'
import { setTransactions } from '../model'
import { useAppDispatch, useAppSelector } from 'shared/lib'
import { useEffect } from 'react'

export const useGetTransactions = () => {
  const [getTransactions, { isLoading }] = useGetTransactionsMutation()
  const dispatch = useAppDispatch()
  const transactions = useAppSelector(
    (state) => state.transactionSlice.transactions,
  )

  useEffect(() => {
    const fetchTransactions = async () => {
      const response = await getTransactions().unwrap()
      dispatch(setTransactions(response.data))
    }

    void fetchTransactions()
  }, [dispatch, getTransactions])

  return { transactions, isLoading }
}

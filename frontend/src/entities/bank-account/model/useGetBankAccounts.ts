import { useGetBankAccountsMutation } from '../api'
import { setBankAccounts } from '../model'
import { useAppDispatch, useAppSelector } from 'shared/lib'
import { useEffect } from 'react'

export const useGetBankAccounts = () => {
  const [getBankAccounts] = useGetBankAccountsMutation()
  const dispatch = useAppDispatch()
  const bankAccounts = useAppSelector(
    (state) => state.bankAccountsSlice.bankAccounts,
  )

  useEffect(() => {
    const fetchBankAccounts = async () => {
      const response = await getBankAccounts().unwrap()
      dispatch(setBankAccounts(response.data))
    }

    void fetchBankAccounts()
  }, [dispatch, getBankAccounts])

  return bankAccounts
}

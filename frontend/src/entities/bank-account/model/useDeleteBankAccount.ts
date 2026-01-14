import { useDeleteBankAccountMutation } from '../api'
import { deleteBankAccount } from '../model'
import { useAppDispatch, useAppSelector } from 'shared/lib'
import { getApiError } from 'shared/api'
import { setUserSettings } from 'entities/user'

export const useDeleteBankAccount = () => {
  const [deleteBankAccountFn] = useDeleteBankAccountMutation()
  const userSettings = useAppSelector(
    (state) => state.userSlice.user?.userSettings,
  )
  const dispatch = useAppDispatch()
  const bankAccounts = useAppSelector(
    (state) => state.bankAccountsSlice.bankAccounts,
  )

  return async (data: { uuid: string }) => {
    try {
      dispatch(deleteBankAccount(data.uuid))
      if (userSettings?.defaultBankAccount?.uuid === data.uuid) {
        dispatch(
          setUserSettings({
            ...userSettings,
            defaultBankAccount: bankAccounts.filter(
              (bankAccount) => bankAccount.uuid !== data.uuid,
            )[0],
          }),
        )
      }
      deleteBankAccountFn(data)
    } catch (error) {
      const err = getApiError<Record<string, string>>(error)
      console.log(err)
    }
  }
}

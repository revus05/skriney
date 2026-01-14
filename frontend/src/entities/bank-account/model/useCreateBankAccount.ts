'use client'

import { useAppDispatch, useAppSelector } from 'shared/lib'
import { CreateBankAccountRequestDTO, getApiError } from 'shared/api'
import { useCreateBankAccountMutation } from '../api'
import { addBankAccount } from '../model'
import { setUserSettings } from 'entities/user'

export const useCreateBankAccount = () => {
  const [createBankAccount, { isLoading }] = useCreateBankAccountMutation()
  const dispatch = useAppDispatch()
  const userSettings = useAppSelector(
    (state) => state.userSlice.user?.userSettings,
  )

  return {
    onSubmit: async (data: CreateBankAccountRequestDTO) => {
      try {
        const res = await createBankAccount(data).unwrap()
        if (res && res.data) {
          dispatch(addBankAccount(res.data))
          if (userSettings && !userSettings?.defaultBankAccount) {
            dispatch(
              setUserSettings({
                ...userSettings,
                defaultBankAccount: res.data,
              }),
            )
          }
        }
      } catch (error) {
        const err = getApiError<Record<string, string>>(error)
        console.log(err)
      }
    },
    isLoading,
  }
}

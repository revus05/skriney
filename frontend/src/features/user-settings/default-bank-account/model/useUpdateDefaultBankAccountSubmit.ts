import { useAppDispatch } from 'shared/lib'
import { useUpdateDefaultBankAccountMutation } from 'entities/user-setting'
import { getApiError, UpdateDefaultBankAccountRequestDTO } from 'shared/api'
import { setUserSettings } from 'entities/user'

export const useUpdateDefaultBankAccountSubmit = () => {
  const [updateDefaultBankAccount] = useUpdateDefaultBankAccountMutation()
  const dispatch = useAppDispatch()

  return async (data: UpdateDefaultBankAccountRequestDTO) => {
    try {
      const res = await updateDefaultBankAccount(data).unwrap()
      if (res && res.data) {
        dispatch(setUserSettings(res.data))
      }
    } catch (error) {
      const err = getApiError<Record<string, string>>(error)
      console.log(err)
    }
  }
}

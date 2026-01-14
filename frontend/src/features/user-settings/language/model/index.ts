import { useAppDispatch } from 'shared/lib'
import { useUpdateLanguageMutation } from 'entities/user-setting'
import { getApiError, UpdateLanguageRequestDTO } from 'shared/api'
import { setUserSettings, updateUserLanguage } from 'entities/user'

export const useUpdateLanguage = () => {
  const [updateLanguage] = useUpdateLanguageMutation()
  const dispatch = useAppDispatch()

  return async (data: UpdateLanguageRequestDTO) => {
    try {
      dispatch(updateUserLanguage(data.language))
      const res = await updateLanguage(data).unwrap()
      if (res && res.data) {
        dispatch(setUserSettings(res.data))
      }
    } catch (error) {
      const err = getApiError<Record<string, string>>(error)
      console.log(err)
    }
  }
}

import { useAppDispatch, useAppSelector } from 'shared/lib'
import { setUserSettings } from 'entities/user'
import { getApiError, UpdateAnimationEnabledRequestDTO } from 'shared/api'
import { useUpdateAnimationEnabledMutation } from 'entities/user-setting/api'

export const useUpdateAnimationEnabledSubmit = () => {
  const [updateAnimationEnabled] = useUpdateAnimationEnabledMutation()
  const dispatch = useAppDispatch()
  const userSettings = useAppSelector(
    (state) => state.userSlice.user?.userSettings,
  )

  return async (data: UpdateAnimationEnabledRequestDTO) => {
    try {
      if (userSettings) {
        dispatch(
          setUserSettings({
            ...userSettings,
            animationEnabled: data.animationEnabled,
          }),
        )
      }
      const res = await updateAnimationEnabled(data).unwrap()
      if (res && res.data) {
        if (userSettings && !userSettings?.defaultCategory) {
          dispatch(setUserSettings(userSettings))
        }
      }
    } catch (error) {
      const err = getApiError<Record<string, string>>(error)
      console.log(err)
    }
  }
}

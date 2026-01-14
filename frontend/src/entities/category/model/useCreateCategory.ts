'use client'

import { useAppDispatch, useAppSelector } from 'shared/lib'
import { CreateCategoryRequestDTO, getApiError } from 'shared/api'
import { useCreateCategoryMutation } from '../api'
import { addCategory } from '../model'
import { setUserSettings } from 'entities/user'

export const useCreateCategory = () => {
  const [createCategory, { isLoading }] = useCreateCategoryMutation()
  const dispatch = useAppDispatch()
  const userSettings = useAppSelector(
    (state) => state.userSlice.user?.userSettings,
  )

  return {
    onSubmit: async (data: CreateCategoryRequestDTO) => {
      try {
        const res = await createCategory(data).unwrap()
        if (res && res.data) {
          dispatch(addCategory(res.data))
          if (userSettings && !userSettings?.defaultCategory) {
            dispatch(
              setUserSettings({ ...userSettings, defaultCategory: res.data }),
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

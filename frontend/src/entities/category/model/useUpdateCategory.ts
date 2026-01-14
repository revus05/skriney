'use client'

import { useAppDispatch } from 'shared/lib'
import { getApiError, UpdateCategoryRequestDTO } from 'shared/api'
import { useUpdateCategoryMutation } from '../api'
import { positiveUpdateCategory, updateCategory } from '../model'
import { updateCategoryModalOpenFn } from 'features/categories/update-category'

export const useUpdateCategory = () => {
  const [updateCategoryFn] = useUpdateCategoryMutation()
  const dispatch = useAppDispatch()

  return async (uuid: string, body: UpdateCategoryRequestDTO) => {
    try {
      dispatch(positiveUpdateCategory({ ...body, uuid }))
      dispatch(updateCategoryModalOpenFn(false))
      const res = await updateCategoryFn({ uuid, body }).unwrap()
      if (res && res.data) {
        dispatch(updateCategory(res.data))
      }
    } catch (error) {
      const err = getApiError<Record<string, string>>(error)
      console.log(err)
    }
  }
}

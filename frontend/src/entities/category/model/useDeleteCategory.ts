import { deleteCategory, useDeleteCategoryMutation } from 'entities/category'
import { useAppDispatch, useAppSelector } from 'shared/lib'
import { getApiError } from 'shared/api'
import { setUserSettings } from 'entities/user'

export const useDeleteCategory = () => {
  const [deleteCategoryFn] = useDeleteCategoryMutation()
  const dispatch = useAppDispatch()
  const userSettings = useAppSelector(
    (state) => state.userSlice.user?.userSettings,
  )
  const categories = useAppSelector((state) => state.categorySlice.categories)

  return async (data: { uuid: string }) => {
    try {
      dispatch(deleteCategory(data.uuid))
      if (userSettings?.defaultCategory?.uuid === data.uuid) {
        dispatch(
          setUserSettings({
            ...userSettings,
            defaultCategory: categories.filter(
              (category) => category.uuid !== data.uuid,
            )[0],
          }),
        )
      }
      deleteCategoryFn(data)
    } catch (error) {
      const err = getApiError<Record<string, string>>(error)
      console.log(err)
    }
  }
}

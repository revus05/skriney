'use client'

import { setCategories } from '../model'
import { useGetCategoriesMutation } from '../api'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'shared/lib'

export const useGetCategories = () => {
  const [getCategories, { isLoading }] = useGetCategoriesMutation()
  const dispatch = useAppDispatch()
  const categories = useAppSelector((state) => state.categorySlice.categories)

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await getCategories().unwrap()
      dispatch(setCategories(response.data))
    }

    void fetchCategories()
  }, [dispatch, getCategories])

  return { categories, isLoading }
}

'use client'

import { CreateCategoryRequestDTO } from 'shared/api'
import { useCreateCategory } from 'entities/category'

export const useCreateCategorySubmit = (onSuccess?: () => void) => {
  const { onSubmit, isLoading } = useCreateCategory()

  return {
    onSubmit: async (data: CreateCategoryRequestDTO) => {
      await onSubmit(data)
      if (onSuccess) onSuccess()
    },
    isLoading,
  }
}

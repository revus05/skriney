'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { UpdateCategoryFormData, updateCategorySchema } from './schema'
import { useTranslation } from 'shared/i18n'

export const useUpdateCategoryForm = () => {
  const t = useTranslation()

  return useForm<UpdateCategoryFormData>({
    resolver: zodResolver(updateCategorySchema(t)),
    defaultValues: {
      title: '',
      emoji: '',
    },
    mode: 'onSubmit',
  })
}

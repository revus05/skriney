'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CreateCategoryFormData, createCategorySchema } from './schema'
import { useTranslation } from 'shared/i18n'

export const useCreateCategoryForm = () => {
  const t = useTranslation()

  return useForm<CreateCategoryFormData>({
    resolver: zodResolver(createCategorySchema(t)),
    defaultValues: {
      title: '',
      emoji: '',
    },
    mode: 'onSubmit',
  })
}

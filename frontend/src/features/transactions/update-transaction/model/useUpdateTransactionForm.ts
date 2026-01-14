'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { UpdateTransactionFormData, updateTransactionSchema } from './schema'
import { useTranslation } from 'shared/i18n'

export const useUpdateTransactionForm = () => {
  const t = useTranslation()

  return useForm<UpdateTransactionFormData>({
    resolver: zodResolver(updateTransactionSchema(t)),
    defaultValues: {
      categoryUuid: '',
      bankAccountUuid: '',
      amount: '',
      currency: '',
      description: '',
    },
    mode: 'onSubmit',
  })
}

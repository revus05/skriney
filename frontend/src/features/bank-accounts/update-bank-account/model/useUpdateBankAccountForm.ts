'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { UpdateBankAccountFormData, updateBankAccountSchema } from './schema'
import { useTranslation } from 'shared/i18n'

export const useUpdateBankAccountForm = () => {
  const t = useTranslation()

  return useForm<UpdateBankAccountFormData>({
    resolver: zodResolver(updateBankAccountSchema(t)),
    defaultValues: {
      title: '',
      emoji: '',
    },
    mode: 'onSubmit',
  })
}

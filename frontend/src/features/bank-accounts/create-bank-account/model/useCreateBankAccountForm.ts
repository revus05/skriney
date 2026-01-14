'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CreateBankAccountFormData, createBankAccountSchema } from './schema'
import { useAppSelector } from 'shared/lib'
import { useTranslation } from 'shared/i18n'

export const useCreateBankAccountForm = () => {
  const defaultCurrency = useAppSelector(
    (state) => state.userSlice.user?.userSettings?.defaultCurrency,
  )

  const t = useTranslation()

  return useForm<CreateBankAccountFormData>({
    resolver: zodResolver(createBankAccountSchema(t)),
    defaultValues: {
      title: '',
      initialBalance: '0',
      currency: defaultCurrency || '',
    },
    mode: 'onSubmit',
  })
}

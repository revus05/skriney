'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { SignInFormData, signInSchema } from './schema'
import { useTranslation } from 'shared/i18n'

export const useSignInForm = () => {
  const t = useTranslation()

  return useForm<SignInFormData>({
    resolver: zodResolver(signInSchema(t)),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onSubmit',
  })
}

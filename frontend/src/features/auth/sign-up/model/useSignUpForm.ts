'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { SignUpFormData, signUpSchema } from './schema'
import { useTranslation } from 'shared/i18n'

export const useSignUpForm = () => {
  const t = useTranslation()

  return useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema(t)),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onSubmit',
  })
}

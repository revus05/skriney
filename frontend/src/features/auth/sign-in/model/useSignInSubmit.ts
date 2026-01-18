'use client'

import { signIn, useSignInUserMutation } from 'entities/user'
import { useAppDispatch } from 'shared/lib'
import { useRouter } from 'next/navigation'
import { getApiError } from 'shared/api'
import { addToast } from '@heroui/toast'
import { createElement } from 'react'
import { Icons } from 'shared/ui'
import { SignInFormData } from './schema'
import { paths } from 'shared/navigation'

export const useSignInSubmit = () => {
  const [signInUser, { isLoading }] = useSignInUserMutation()
  const dispatch = useAppDispatch()
  const router = useRouter()

  return {
    onSubmit: async (data: SignInFormData) => {
      try {
        const res = await signInUser(data).unwrap()
        if (res && res.data) {
          sessionStorage.setItem('pending-sign-in', 'true')
          dispatch(signIn(res.data))
          router.push(paths.home)
        }
      } catch (error) {
        const err = getApiError<Record<string, string>>(error)
        if (err.status === 401)
          addToast({
            title: err.message,
            classNames: {
              base: 'bg-bg-neutral-tertiary/70 rounded-3xl border px-6 py-4 backdrop-blur-[32px]',
              title: 'text-text-semantic-error-primary font-bold',
              icon: 'fill-icon-semantic-error-primary font-bold',
            },
            icon: createElement(Icons.dollarCircle),
          })
      }
    },
    isLoading,
  }
}

'use client'

import { useSignUpUserMutation } from 'entities/user'
import { useRouter } from 'next/navigation'
import { paths } from 'shared/navigation'
import { getApiError } from 'shared/api'
import { SignUpFormData } from './schema'
import { useSignUpForm } from './useSignUpForm'

export const useSignUpSubmit = (
  setError: ReturnType<typeof useSignUpForm>['setError'],
) => {
  const [signUpUser] = useSignUpUserMutation()
  const router = useRouter()

  return async (data: SignUpFormData) => {
    try {
      await signUpUser(data).unwrap()
      router.push(paths.signIn)
    } catch (error) {
      const { data } = getApiError<Record<string, string>>(error)

      if (data) {
        Object.entries(data).forEach(([field, message]) => {
          setError(field as keyof SignUpFormData, { message })
        })
      }
    }
  }
}

'use client'

import { useRouter } from 'next/navigation'
import { paths } from 'shared/navigation'
import { useSignOutUserMutation } from 'entities/user/api'

export const useSignOutSubmit = () => {
  const [signOutUser, { isLoading }] = useSignOutUserMutation()
  const router = useRouter()

  return {
    onSubmit: async () => {
      try {
        router.prefetch(paths.signIn)
        const res = await signOutUser().unwrap()
        if (res) {
          router.replace(paths.signIn)
        }
      } catch (error) {
        console.error(error)
      }
    },
    isLoading,
  }
}

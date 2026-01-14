'use server'

import { UserDTO } from 'shared/api'
import { headers } from 'next/headers'

export type PreloadedState = {
  userSlice: { user: UserDTO | null }
  language: 'EN' | 'RU'
  theme: 'DARK' | 'LIGHT' | 'SYSTEM'
}

export const getPreloadedState = async (): Promise<PreloadedState> => {
  const originalHeaders = await headers()

  const res = await fetch(`http://localhost:3000/api/preload`, {
    cache: 'no-store',
    headers: originalHeaders,
  })

  if (!res.ok) {
    console.error('Failed to preload state')
  }

  return res.json()
}

'use server'

import { cookies, headers } from 'next/headers'
import type { UserDTO, UserSettingsDTO, ApiResponse } from 'shared/api'

export type PreloadedState = {
  userSlice: { user: UserDTO | null }
  language: 'EN' | 'RU'
  theme: 'DARK' | 'LIGHT' | 'SYSTEM'
}

async function getUserLanguageFromHeaders(): Promise<'EN' | 'RU'> {
  const headersList = await headers()
  const acceptLanguage = headersList.get('accept-language')
  const lang = acceptLanguage?.split(',')[0].split('-')[0].toUpperCase() || 'EN'
  return lang === 'EN' || lang === 'RU' ? lang : 'EN'
}

const getDefaultState = (
  language: 'EN' | 'RU' = 'EN',
  user: UserDTO | null = null,
  theme: 'DARK' | 'LIGHT' | 'SYSTEM' = 'SYSTEM',
): PreloadedState => ({
  userSlice: { user },
  language,
  theme,
})

export async function getPreloadedState(): Promise<PreloadedState> {
  const cookieStore = await cookies()
  const jwt = cookieStore.get('jwt')?.value

  const language = await getUserLanguageFromHeaders()

  if (!jwt) {
    return getDefaultState(language)
  }

  let meRes
  try {
    meRes = await fetch(`${process.env.NEXT_PUBLIC_ITERNAL_API_URL}/users/me`, {
      method: 'GET',
      cache: 'no-store',
      headers: {
        Cookie: `jwt=${jwt}`,
      },
    })
  } catch (err) {
    console.error('Failed to fetch /users/me', err)
    return getDefaultState(language)
  }

  if (!meRes.ok) {
    console.warn('me endpoint not ok', meRes.status)
    return getDefaultState(language)
  }

  let user: UserDTO | undefined
  try {
    const meData: ApiResponse<UserDTO> = await meRes.json()
    user = meData.data
  } catch (err) {
    console.error('Failed to parse user', err)
    return getDefaultState(language)
  }

  if (!user) {
    return getDefaultState(language)
  }

  // Обновляем язык, если его нет
  if (!user.userSettings?.language) {
    try {
      const updateRes = await fetch(
        `${process.env.NEXT_PUBLIC_ITERNAL_API_URL}/user-settings/update-language`,
        {
          method: 'POST',
          cache: 'no-store',
          headers: {
            'Content-Type': 'application/json',
            Cookie: `jwt=${jwt}`,
          },
          body: JSON.stringify({ language }),
        },
      )

      if (updateRes.ok) {
        const updateData: ApiResponse<UserSettingsDTO> = await updateRes.json()
        if (updateData.data?.language) {
          user.userSettings.language = updateData.data.language
        }
      }
    } catch (err) {
      console.error('Failed to update language', err)
      // не фатально — продолжаем с текущим языком
    }
  }

  return getDefaultState(
    user.userSettings?.language || language,
    user,
    user.userSettings?.userTheme,
  )
}

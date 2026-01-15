import { NextResponse } from 'next/server'
import { cookies, headers } from 'next/headers'
import type { ApiResponse, UserDTO, UserSettingsDTO } from 'shared/api'

type PreloadedState = {
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

type GetPreloadedObject = (
  language?: 'EN' | 'RU',
  user?: UserDTO | null,
  theme?: 'DARK' | 'LIGHT' | 'SYSTEM',
) => PreloadedState

const getPreloadedObject: GetPreloadedObject = (
  language = 'EN',
  user = null,
  theme = 'SYSTEM',
) => ({
  userSlice: { user },
  language,
  theme,
})

export async function GET() {
  const cookieStore = await cookies()
  const jwt = cookieStore.get('jwt')?.value

  const language = await getUserLanguageFromHeaders()

  if (!jwt) {
    return NextResponse.json<PreloadedState>(getPreloadedObject(language))
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
  } catch (error) {
    console.error(error)
    console.log('UNABLE TO GET USER DATA WITH JWT')
  }

  if ((meRes && !meRes.ok) || !meRes) {
    return NextResponse.json<PreloadedState>(getPreloadedObject(language))
  }
  let user

  try {
    const meData: ApiResponse<UserDTO> = await meRes.json()
    user = meData.data
  } catch (error) {
    console.log(error)
  }

  if (!user) {
    return NextResponse.json<PreloadedState>(getPreloadedObject(language))
  }

  if (!user.userSettings?.language) {
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
  }

  return NextResponse.json<PreloadedState>(
    getPreloadedObject(
      user.userSettings?.language || language,
      user,
      user.userSettings?.userTheme,
    ),
  )
}

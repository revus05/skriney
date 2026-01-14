'use client'

import { Tabs } from 'shared/ui'
import { useAppSelector } from 'shared/lib'
import { useUpdateThemeSubmit } from '../model'
import { useState } from 'react'

export const UpdateThemeSegmentControl = () => {
  const defaultTheme = useAppSelector(
    (state) => state.userSlice.user?.userSettings?.userTheme || 'SYSTEM',
  )

  const [theme, setTheme] = useState<string>(defaultTheme.toLowerCase())

  const updateTheme = useUpdateThemeSubmit()

  const themeOptions = [
    {
      value: 'light',
      icon: 'sun',
      onClick: () => updateTheme({ theme: 'LIGHT' }),
    },
    {
      value: 'system',
      icon: 'system',
      onClick: () => updateTheme({ theme: 'SYSTEM' }),
    },
    {
      value: 'dark',
      icon: 'moon',
      onClick: () => updateTheme({ theme: 'DARK' }),
    },
  ]

  return (
    <div>
      <Tabs
        label={'Themes'}
        value={theme}
        onValueChangeAction={setTheme}
        options={themeOptions}
      />
    </div>
  )
}

'use client'

import { Select, SelectItem } from 'shared/ui'
import { useUpdateLanguage } from '../model'
import { useState } from 'react'
import { useAppSelector } from 'shared/lib'
import { useTranslation } from 'shared/i18n'
import { Languages } from 'shared/constants/languages'

export const UpdateLanguageSelect = () => {
  const updateLanguage = useUpdateLanguage()

  const language =
    useAppSelector((state) => state.userSlice.user?.userSettings?.language) ||
    Languages.EN

  const [selectedLanguage, setSelectedLanguage] =
    useState<keyof typeof Languages>(language)

  const handleSelectLanguageChanged = (language: keyof typeof Languages) => {
    setSelectedLanguage(language)
    void updateLanguage({ language })
  }

  const t = useTranslation()

  return (
    <Select
      label={'default-currency'}
      className={'w-[150px]'}
      placeholder={t('settings.list.language')}
      onValueChangeAction={handleSelectLanguageChanged}
      value={selectedLanguage}
    >
      {Object.keys(Languages).map((lang) => (
        <SelectItem key={lang} className={'outline-none'}>
          {lang}
        </SelectItem>
      ))}
    </Select>
  )
}

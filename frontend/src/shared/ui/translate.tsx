'use client'

import { useTranslation } from 'shared/i18n'
import { FC } from 'react'

type TranslateProps = {
  value: string
}

export const Translate: FC<TranslateProps> = ({ value }) => {
  const t = useTranslation()

  return t(value)
}

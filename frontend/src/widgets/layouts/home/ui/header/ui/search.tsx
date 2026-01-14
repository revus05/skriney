'use client'

import { Input } from 'shared/ui'
import { useTranslation } from 'shared/i18n'

export const HeaderSearch = () => {
  const t = useTranslation()

  return (
    <Input
      className={'bg-bg-neutral-secondary/70 w-[394px]'}
      placeholder={t('header.search')}
      iconStart={'search'}
    />
  )
}

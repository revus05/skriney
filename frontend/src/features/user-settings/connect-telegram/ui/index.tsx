'use client'

import Link from 'next/link'
import { Icons, Translate } from 'shared/ui'
import { useAppSelector } from 'shared/lib'

export const ConnectTelegramButton = () => {
  const userId = useAppSelector((state) => state.userSlice.user?.uuid) || ''
  const telegramId = useAppSelector((state) => state.userSlice.user?.telegramId)

  if (telegramId) {
    return (
      <div className={'flex items-center gap-2'}>
        <span className={'text-text-semantic-success-primary font-medium'}>
          <Translate value={'settings.list.connectTelegram.connected'} />
        </span>
        <Icons.check className={'fill-icon-semantic-success-primary size-5'} />
      </div>
    )
  }

  return (
    <Link
      href={`https://t.me/skriney_bot?start=${userId}`}
      className={
        'flex items-center gap-2.5 rounded-lg border px-4 py-2 font-semibold shadow-sm backdrop-blur-[32px] transition will-change-transform active:scale-[0.98] active:shadow-md'
      }
    >
      <Icons.link />{' '}
      <Translate value={'settings.list.connectTelegram.button'} />
    </Link>
  )
}

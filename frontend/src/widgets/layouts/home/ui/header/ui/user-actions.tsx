'use client'

import { paths } from 'shared/navigation'
import { useRouter } from 'next/navigation'
import { useAppSelector } from 'shared/lib'
import { Popover, PopoverContent, PopoverTrigger } from '@heroui/react'
import { Button, Translate, UserImage } from 'shared/ui'
import { useSignOutSubmit } from 'features/auth/sign-out'
import { useEffect, useState } from 'react'

export const HeaderUserActions = () => {
  const user = useAppSelector((state) => state.userSlice.user)

  const router = useRouter()

  const { onSubmit, isLoading } = useSignOutSubmit()

  const [isRedirecting, setIsRedirecting] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem('pending-sign-out') === 'true') {
      setIsRedirecting(true)
      sessionStorage.removeItem('pending-sign-out')
    }
  }, [isLoading])

  return (
    <Popover placement="bottom-end">
      <PopoverTrigger
        className={
          'hover:bg-bg-neutral-secondary cursor-pointer rounded-lg px-2 py-1'
        }
      >
        <div className={'flex items-center gap-2'}>
          <span className={'font-semibold'}>{user?.username}</span>
          <UserImage
            image={user?.image}
            username={user?.username}
            userColor={user?.color}
            className={'size-8 [&_span]:text-sm'}
            size={32}
          />
        </div>
      </PopoverTrigger>
      <PopoverContent
        className={'bg-bg-neutral-primary rounded-2xl border p-1'}
      >
        <div className="flex flex-col items-start gap-2.5 align-top">
          <Button
            variant={'ghost'}
            iconStart={'user'}
            className={
              'text-text-neutral-tertiary w-full rounded-xl px-3 py-2 font-bold'
            }
            onClick={() => router.replace(paths.profile)}
          >
            <Translate value={`header.userActions.profile`} />
          </Button>
          <Button
            variant={'ghost'}
            iconStart={'logout'}
            className={
              '[&_svg]:fill-icon-semantic-error-primary text-text-semantic-error-primary [&_div_div_div]:bg-bg-semantic-error-bold w-full rounded-xl px-3 py-2 font-bold'
            }
            onClick={onSubmit}
            loading={isLoading || isRedirecting}
          >
            <Translate value={`header.userActions.logout`} />
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

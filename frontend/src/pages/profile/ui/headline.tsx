'use client'

import { useAppSelector } from 'shared/lib'
import { Balance } from 'shared/ui'
import { CurrencySymbols } from 'shared/constants/currencies'
import { useGetBalanceSummary } from 'entities/balance'
import { UpdatableUserImage } from 'features/user-settings/image'

export const ProfileHeadline = () => {
  const user = useAppSelector((state) => state.userSlice.user)

  const summaryBalance = useGetBalanceSummary()

  return (
    <div className={'flex items-center gap-6'}>
      <UpdatableUserImage />
      <div className={'flex flex-col gap-2.5'}>
        <span className={'text-[32px] font-bold'}>{user?.username}</span>
        <span className={'text-[32px] font-bold'}>
          <Balance
            balanceInUsd={summaryBalance?.totalBalanceInUsd || 0}
            currency={CurrencySymbols.USD}
            classNames={{
              balance: 'text-xl font-bold',
              currency: 'text-sm font-normal',
              text: '!h-6',
            }}
          />
        </span>
      </div>
    </div>
  )
}

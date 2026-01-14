'use client'

import { TotalBalanceCard } from 'entities/balance'
import { CurrencySymbols } from 'shared/constants/currencies'
import { useGetBalanceSummary } from 'entities/balance'

export const TotalBalance = () => {
  const balanceSummary = useGetBalanceSummary()

  return (
    <div className={'flex gap-4'}>
      <TotalBalanceCard
        type={'balance'}
        amount={balanceSummary?.totalBalanceInUsd || 0}
        currency={CurrencySymbols.USD}
        changePercent={0}
      />
      <TotalBalanceCard
        type={'income'}
        amount={balanceSummary?.totalIncomeInUsd || 0}
        currency={CurrencySymbols.USD}
        changePercent={0}
      />
      <TotalBalanceCard
        type={'expenses'}
        amount={balanceSummary?.totalExpenseInUsd || 0}
        currency={CurrencySymbols.USD}
        changePercent={0}
      />
    </div>
  )
}

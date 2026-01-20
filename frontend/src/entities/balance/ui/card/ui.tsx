'use client'

import { FC } from 'react'
import { Balance, Card, Icons, Translate, Trend } from 'shared/ui'

type TotalBalanceType = {
  type: 'balance' | 'income' | 'expenses'
  amount: number
  currency: string
  changePercent: number | null
}

const TYPE_CONFIG = {
  balance: {
    icon: <Icons.dollarCircle />,
    title: <Translate value={'home.totalBalance.balance'} />,
  },
  income: {
    icon: <Icons.arrowBottomLeft />,
    title: <Translate value={'home.totalBalance.income'} />,
  },
  expenses: {
    icon: <Icons.arrowTopRight />,
    title: <Translate value={'home.totalBalance.outcome'} />,
  },
} as const

export const TotalBalanceCard: FC<TotalBalanceType> = ({
  type,
  amount,
  currency,
  changePercent,
}) => {
  const { icon, title } = TYPE_CONFIG[type]

  return (
    <Card className={'flex gap-4'}>
      <div className="fill-icon-neutral-tertiary">{icon}</div>

      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-1">
          <span className="text-text-neutral-tertiary">{title}</span>
          <Balance
            balance={amount}
            currency={currency}
            isExpense={type === 'expenses'}
          />
        </div>

        {!!changePercent && (
          <Trend
            changePercent={changePercent}
            isExpense={type === 'expenses'}
          />
        )}
      </div>
    </Card>
  )
}

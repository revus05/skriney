import { FC, Fragment } from 'react'
import { cn } from 'shared/lib'
import { formatMoney } from 'shared/lib/format-money'
import { Currency } from 'shared/constants/currencies'

type BalanceType = {
  balanceInUsd?: number
  balance?: number
  currencyBalances?: Record<string, number>
  goalAmount?: number
  currency?: string
  withBackground?: boolean
  withColor?: boolean
  signed?: boolean
  isExpense?: boolean
  classNames?: {
    balance?: string
    currency?: string
    text?: string
    wrapper?: string
  }
}

export const Balance: FC<BalanceType> = ({
  balanceInUsd,
  balance,
  goalAmount,
  currency,
  withBackground,
  withColor,
  signed = false,
  classNames,
  isExpense = false,
  currencyBalances = {},
}) => {
  const formattedBalance = formatMoney(balance ?? 0)
  const formattedBalanceIdUsd = formatMoney(balanceInUsd ?? 0)
  const formattedGoal =
    goalAmount !== undefined ? formatMoney(goalAmount) : undefined

  return (
    <div
      className={cn(
        'whitespace-nowrap',
        withBackground &&
          'flex w-fit shrink-0 flex-nowrap rounded-md px-1 py-0.5 backdrop-blur-[32px]',
        withBackground &&
          (isExpense
            ? (balanceInUsd ?? balance ?? 0 <= 0)
              ? 'bg-bg-semantic-success-subtle/70'
              : 'bg-bg-semantic-error-subtle/70'
            : (balanceInUsd ?? balance ?? 0 <= 0)
              ? 'bg-bg-semantic-error-subtle/70'
              : 'bg-bg-semantic-success-subtle/70'),
        classNames?.wrapper,
      )}
    >
      <div
        className={cn('flex items-center gap-2 leading-5', classNames?.text)}
      >
        {Object.entries(currencyBalances).length > 0 && (
          <span>
            {Object.entries(currencyBalances).map(
              ([currency, balance], index) => (
                <span
                  key={currency}
                  className={cn(
                    'text-text-neutral-primary text-base leading-5 font-semibold',
                    (withBackground || withColor) &&
                      (isExpense
                        ? balance <= 0
                          ? 'text-text-semantic-success-primary'
                          : 'text-text-semantic-error-primary'
                        : balance <= 0
                          ? 'text-text-semantic-error-primary'
                          : 'text-text-semantic-success-primary'),
                    classNames?.balance,
                  )}
                >
                  {(signed || index !== 0) && balance > 0 && '+'}
                  {balance}
                  {currency}
                </span>
              ),
            )}
          </span>
        )}
        {balance && (
          <span
            className={cn(
              'text-text-neutral-primary text-base leading-5 font-semibold',
              (withBackground || withColor) &&
                (isExpense
                  ? balance || balanceInUsd || 0 <= 0
                    ? 'text-text-semantic-error-primary'
                    : 'text-text-semantic-success-primary'
                  : balance || balanceInUsd || 0 <= 0
                    ? 'text-text-semantic-success-primary'
                    : 'text-text-semantic-error-primary'),
              classNames?.balance,
            )}
          >
            {balance && (
              <span className={'text-text-neutral-tertiary text-xs'}>
                {signed && balance > 0 && '+'}
                {formattedBalance} {currency}
              </span>
            )}
          </span>
        )}
        {!!balanceInUsd && Object.entries(currencyBalances).length > 1 && (
          <span className={'text-text-neutral-tertiary text-xs'}>
            {` ≈ ${formattedBalanceIdUsd}`}
            {Currency.USD}
          </span>
        )}
        {goalAmount && (
          <>
            <span className="text-text-neutral-tertiary leading-5"> / </span>
            <span className="text-text-neutral-primary text-base leading-5 font-bold">
              {formattedGoal}
            </span>
          </>
        )}
        <span
          className={cn('text-text-neutral-tertiary', classNames?.currency)}
        >
          {' '}
          {currency}
        </span>
      </div>
    </div>
  )
}

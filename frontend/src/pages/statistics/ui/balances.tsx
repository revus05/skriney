'use client'

import { useGetDailyBalances } from 'entities/balance'
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { cn, useAppSelector } from 'shared/lib'
import { Balance, Card, Loader, Select, SelectItem, Translate } from 'shared/ui'
import { Currency } from 'shared/constants/currencies'
import { ContentType } from 'recharts/types/component/Tooltip'
import {
  NameType,
  ValueType,
} from 'recharts/types/component/DefaultTooltipContent'
import { useState } from 'react'
import { useTranslation } from 'shared/i18n'

export const Balances = () => {
  const language =
    useAppSelector((state) => state.userSlice.user?.userSettings?.language) ||
    'EN'

  const animationEnabled =
    useAppSelector(
      (state) => state.userSlice.user?.userSettings?.animationEnabled,
    ) ?? true

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString(
      `${language}-${language.toUpperCase()}`,
      {
        day: 'numeric',
        month: 'long',
      },
    )

  const [type, setType] = useState<'balance' | 'incomeAndExpenses'>('balance')

  const { dailyBalances, isLoading } = useGetDailyBalances()

  const t = useTranslation()

  return (
    <Card className="relative">
      {isLoading && (
        <div className={'absolute top-1/2 left-1/2 -translate-1/2'}>
          <Loader />
        </div>
      )}
      <div
        className={cn(
          isLoading && 'pointer-events-none opacity-50 select-none',
        )}
      >
        <div className={'flex justify-between'}>
          <h2 className={'text-[20px] font-bold'}>
            <Translate value={'statistics.transactionDynamic'} />
          </h2>
          <Select
            label={'period'}
            className={'w-37.5'}
            placeholder={'Тип'}
            value={type}
            onValueChangeAction={setType}
          >
            {['balance', 'incomeAndExpenses'].map((type) => (
              <SelectItem key={type}>
                {t(`statistics.chartType.${type}`)}
              </SelectItem>
            ))}
          </Select>
        </div>
        <div className={'h-37.5'}>
          <ResponsiveContainer width={'100%'} height={'100%'}>
            <BarChart data={dailyBalances} tabIndex={-1}>
              <XAxis
                dataKey="date"
                tick={{ fill: 'var(--color-text-neutral-primary)' }}
                tickFormatter={formatDate}
                tickLine={{ stroke: 'var(--color-border-neutral-primary)' }}
              />

              <YAxis
                tick={{ fill: 'var(--color-text-neutral-primary)' }}
                tickLine={{ stroke: 'var(--color-border-neutral-primary)' }}
                tickFormatter={(value) => `${value} BYN`}
              />

              {!isLoading && (
                <Tooltip
                  content={CustomTooltip}
                  cursor={{ fill: 'var(--color-bg-neutral-tertiary)' }}
                  position={{ y: -100 }}
                  isAnimationActive={animationEnabled}
                />
              )}

              {type === 'balance' && (
                <Bar
                  dataKey="totalBalance"
                  fill="var(--color-bg-neutral-inverse-tertiary)"
                  radius={[8, 8, 0, 0]}
                  barSize={30}
                  isAnimationActive={animationEnabled}
                />
              )}

              {type === 'incomeAndExpenses' && (
                <Bar
                  dataKey="dailyIncome"
                  fill="var(--color-bg-semantic-success-bold)"
                  radius={[8, 8, 0, 0]}
                  barSize={30}
                  isAnimationActive={animationEnabled}
                />
              )}

              {type === 'incomeAndExpenses' && (
                <Bar
                  dataKey="dailyExpenses"
                  fill="var(--color-bg-semantic-error-bold)"
                  radius={[8, 8, 0, 0]}
                  barSize={30}
                  isAnimationActive={animationEnabled}
                />
              )}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  )
}

const CustomTooltip: ContentType<ValueType, NameType> = ({
  active,
  payload,
  label,
}) => {
  if (!active || !payload || !payload.length) {
    return null
  }

  const data = payload[0].payload

  return (
    <div className="bg-bg-neutral-primary rounded-2xl border px-2 py-1.5">
      <p className="text-text-neutral-tertiary font-semibold">{label}</p>
      <div className="mt-2 space-y-1 text-sm">
        <div className="flex items-center gap-1">
          <span className={'text-text-neutral-primary text-xs'}>Баланс:</span>
          <Balance
            balance={data.totalBalance}
            currency={Currency.BYN}
            withColor
            withBackground
            classNames={{
              balance: 'text-xs',
              currency: 'text-xs',
              wrapper: 'py-0 px-1',
            }}
          />
        </div>
        <div className="flex items-center gap-1">
          <span className={'text-text-neutral-primary text-xs'}>
            Изменение:
          </span>
          <Balance
            balance={data.dailyChange}
            currency={Currency.BYN}
            withColor
            withBackground
            signed
            classNames={{
              balance: 'text-xs',
              currency: 'text-xs',
              wrapper: 'py-0 px-1',
            }}
          />
        </div>
        {data.dailyIncome > 0 && (
          <div className="flex items-center gap-1">
            <span className={'text-text-neutral-primary text-xs'}>Доходы:</span>
            <Balance
              balance={data.dailyIncome}
              currency={Currency.BYN}
              withColor
              withBackground
              classNames={{
                balance: 'text-xs',
                currency: 'text-xs',
                wrapper: 'py-0 px-1',
              }}
            />
          </div>
        )}
        {data.dailyExpenses > 0 && (
          <div className="flex items-center gap-1">
            <span className={'text-text-neutral-primary text-xs'}>
              Расходы:
            </span>
            <Balance
              balance={data.dailyExpenses}
              currency={Currency.BYN}
              withColor
              withBackground
              isExpense
              classNames={{
                balance: 'text-xs',
                currency: 'text-xs',
                wrapper: 'py-0 px-1',
              }}
            />
          </div>
        )}
      </div>
    </div>
  )
}

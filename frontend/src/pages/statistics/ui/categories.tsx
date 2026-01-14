'use client'

import { useGetCategories, useGetCategoriesStats } from 'entities/category'
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { Balance, Card, Loader, Translate } from 'shared/ui'
import { cn, useAppSelector } from 'shared/lib'
import { Currency } from 'shared/constants/currencies'
import { FC } from 'react'

const COLORS = [
  '#84cc16',
  '#10b981',
  '#f59e0b',
  '#ef4444',
  '#8b5cf6',
  '#ec4899',
  '#14b8a6',
  '#f97316',
  '#6366f1',
  '#3b82f6',
  '#06b6d4',
  '#22c55e',
]

const NEGATIVE_COLORS = [
  '#ef4444',
  '#f97316',
  '#f59e0b',
  '#eab308',
  '#84cc16',
  '#22c55e',
]

export const CategoriesPieChart = () => {
  const { categories, isLoading: isCategoriesLoading } = useGetCategories()
  const { categoriesStats, isLoading: isCategoriesStatsLoading } =
    useGetCategoriesStats()

  const isLoading = isCategoriesLoading || isCategoriesStatsLoading

  const getCategoryTotalExpenses = (uuid: string): number =>
    categoriesStats.find((stat) => stat.uuid === uuid)?.totalBalanceInUsd ?? 0

  const incomeCategoriesData = categories
    .filter(({ uuid }) => getCategoryTotalExpenses(uuid) > 0)
    .map((cat) => ({
      name: cat.emoji ? `${cat.emoji} ${cat.title}` : cat.title,
      value: Math.abs(getCategoryTotalExpenses(cat.uuid)),
      rawTitle: cat.title,
      uuid: cat.uuid,
    }))
    .sort((a, b) => b.value - a.value)

  const expensesCategoriesData = categories
    .filter(({ uuid }) => getCategoryTotalExpenses(uuid) < 0)
    .map((cat) => ({
      name: cat.emoji ? `${cat.emoji} ${cat.title}` : cat.title,
      value: Math.abs(getCategoryTotalExpenses(cat.uuid)),
      rawTitle: cat.title,
      uuid: cat.uuid,
    }))
    .sort((a, b) => b.value - a.value)

  const hasIncomeCategoriesData = incomeCategoriesData.length > 0
  const hasExpensesCategoriesData = expensesCategoriesData.length > 0

  const animationEnabled =
    useAppSelector(
      (state) => state.userSlice.user?.userSettings.animationEnabled,
    ) ?? true

  type CustomTooltipProps = {
    active?: boolean
    expenses?: boolean
    payload?: [
      {
        payload: {
          name: string
          value: number
        }
      },
    ]
  }

  const CustomTooltip: FC<CustomTooltipProps> = ({
    active,
    payload,
    expenses,
  }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-bg-neutral-primary border-border-neutral-primary rounded-lg border p-3 shadow-lg">
          <p className="text-text-neutral-primary font-medium">
            {payload[0].payload.name}
          </p>
          <Balance
            balance={payload[0].payload.value}
            currency={Currency.USD}
            withColor
            withBackground
            classNames={{
              balance: 'text-xs',
              currency: 'text-xs',
              wrapper: 'py-0 px-1',
            }}
            isExpense={expenses}
            signed={!expenses}
          />
        </div>
      )
    }
    return null
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <Card className="relative p-6">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center rounded-2xl">
            <Loader />
          </div>
        )}

        <div
          className={cn(
            'flex flex-col gap-4',
            isLoading && 'pointer-events-none opacity-50',
          )}
        >
          <div className="flex items-center justify-between">
            <h2 className="text-[20px] font-bold">
              <Translate value="statistics.incomeTitle" />
            </h2>
            {hasIncomeCategoriesData && (
              <div className="flex items-center gap-1">
                <span className={'text-text-neutral-secondary text-sm'}>
                  Всего:
                </span>
                <Balance
                  balance={incomeCategoriesData.reduce(
                    (sum, item) => sum + item.value,
                    0,
                  )}
                  currency={Currency.USD}
                  withColor
                  withBackground
                />
              </div>
            )}
          </div>

          {!hasIncomeCategoriesData ? (
            <div className="text-text-neutral-tertiary flex h-45.5 items-center justify-center">
              <Translate value="statistics.noIncomeYet" />
            </div>
          ) : (
            <div className={'flex items-center gap-8'}>
              <ResponsiveContainer
                width={182}
                height={182}
                className={'shrink-0'}
              >
                <PieChart className={'shrink-0'}>
                  <Pie
                    data={incomeCategoriesData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={90}
                    innerRadius={40}
                    fill="#84cc16"
                    dataKey="value"
                    nameKey="name"
                    isAnimationActive={animationEnabled}
                    tabIndex={-1}
                  >
                    {incomeCategoriesData.map((entry, index) => (
                      <Cell
                        key={`positive-cell-${entry.uuid}`}
                        fill={COLORS[index % COLORS.length]}
                        tabIndex={-1}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex w-[calc(100%-182px-32px)] flex-col gap-2">
                {incomeCategoriesData.map((item, index) => (
                  <div
                    key={item.uuid}
                    className="flex w-full items-center justify-between gap-4"
                  >
                    <div className="flex min-w-0 items-center gap-2">
                      <div
                        className="h-3 w-3 shrink-0 rounded-full"
                        style={{
                          backgroundColor: COLORS[index % COLORS.length],
                        }}
                      />
                      <span
                        className="text-text-neutral-primary truncate"
                        title={item.rawTitle}
                      >
                        {item.rawTitle}
                      </span>
                    </div>

                    <div className="shrink-0">
                      <Balance
                        balance={item.value}
                        currency={Currency.USD}
                        withColor
                        withBackground
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Card>

      <Card className="relative p-6">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center rounded-2xl">
            <Loader />
          </div>
        )}

        <div
          className={cn(
            'flex flex-col gap-4',
            isLoading && 'pointer-events-none opacity-50',
          )}
        >
          <div className="flex items-center justify-between">
            <h2 className="text-[20px] font-bold">
              <Translate value="statistics.expensesTitle" />
            </h2>
            {hasExpensesCategoriesData && (
              <div className="flex items-center gap-1">
                <span className={'text-text-neutral-secondary text-sm'}>
                  Всего:
                </span>
                <Balance
                  balance={expensesCategoriesData.reduce(
                    (sum, item) => sum + item.value,
                    0,
                  )}
                  currency={Currency.BYN}
                  withColor
                  withBackground
                  isExpense
                />
              </div>
            )}
          </div>

          {!hasExpensesCategoriesData ? (
            <div className="text-text-neutral-tertiary flex h-45.5 items-center justify-center">
              <Translate value="statistics.noExpensesYet" />
            </div>
          ) : (
            <div className={'flex items-center gap-8'}>
              <ResponsiveContainer
                width={182}
                height={182}
                className={'shrink-0'}
              >
                <PieChart className={'shrink-0'}>
                  <Pie
                    data={expensesCategoriesData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={90}
                    innerRadius={40}
                    fill="#3b82f6"
                    dataKey="value"
                    nameKey="name"
                    isAnimationActive={animationEnabled}
                    tabIndex={-1}
                  >
                    {expensesCategoriesData.map((entry, index) => (
                      <Cell
                        key={`negative-cell-${entry.uuid}`}
                        fill={NEGATIVE_COLORS[index % NEGATIVE_COLORS.length]}
                        tabIndex={-1}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip expenses />} />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex w-[calc(100%-182px-32px)] flex-col gap-2">
                {expensesCategoriesData.map((item, index) => (
                  <div
                    key={item.uuid}
                    className="flex w-full items-center justify-between gap-4"
                  >
                    <div className="flex min-w-0 items-center gap-2">
                      <div
                        className="h-3 w-3 shrink-0 rounded-full"
                        style={{
                          backgroundColor:
                            NEGATIVE_COLORS[index % NEGATIVE_COLORS.length],
                        }}
                      />
                      <span
                        className="text-text-neutral-primary truncate"
                        title={item.rawTitle}
                      >
                        {item.rawTitle}
                      </span>
                    </div>

                    <div className="shrink-0">
                      <Balance
                        balance={item.value}
                        currency={Currency.BYN}
                        withColor
                        withBackground
                        isExpense
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}

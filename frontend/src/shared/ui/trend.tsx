import { Icons } from 'shared/ui'
import { FC } from 'react'

type TrendType = {
  isExpense?: boolean
  changePercent: number
}

export const Trend: FC<TrendType> = ({ changePercent, isExpense = false }) => {
  const formattedPercent =
    changePercent > 0
      ? `+${changePercent.toFixed(2)}`
      : `${changePercent.toFixed(2)}`

  const isPositive = changePercent > 0

  const changeIconColor =
    isPositive !== isExpense
      ? 'fill-icon-semantic-success-primary'
      : 'fill-icon-semantic-error-primary'

  const changeTextColor =
    isPositive !== isExpense
      ? 'text-text-semantic-success-primary'
      : 'text-text-semantic-error-primary'

  if (changePercent === 0) {
    return null
  }

  return (
    <div className="flex items-center gap-2">
      {isPositive ? (
        <Icons.trendingUp className={changeIconColor} />
      ) : (
        <Icons.trendingDown className={changeIconColor} />
      )}
      <span className={changeTextColor}>{formattedPercent}%</span>
    </div>
  )
}

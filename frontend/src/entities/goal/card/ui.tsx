import { Balance, Card, EmojiTitle, Progress } from 'shared/ui'
import { FC } from 'react'

type GoalCardType = {
  emoji?: string
  title: string
  currentAmount: number
  goalAmount: number
  currency: string
}

export const GoalCard: FC<GoalCardType> = ({
  emoji,
  title,
  currentAmount,
  goalAmount,
  currency,
}) => {
  const percentCompleted = (currentAmount * 100) / goalAmount
  return (
    <Card className={'flex flex-col gap-4'}>
      <EmojiTitle emoji={emoji} title={title} />
      <div className={'flex flex-col gap-2'}>
        <div className={'flex items-center justify-between'}>
          <Balance
            balance={currentAmount}
            goalAmount={goalAmount}
            currency={currency}
          />
          <span className="text-text-neutral-primary font-bold">
            {percentCompleted.toFixed(2)}
            <span className="text-text-neutral-tertiary">%</span>
          </span>
        </div>
        <Progress
          value={(currentAmount * 100) / goalAmount}
          className={'min-w-[256px]'}
        />
      </div>
    </Card>
  )
}

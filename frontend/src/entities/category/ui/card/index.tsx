import { FC } from 'react'
import { Balance, Card, EmojiTitle } from 'shared/ui'

type CategoryCardType = {
  emoji?: string
  title: string
  currency: string
  amount: number
  onEmojiChange?: (emoji: string) => void
  onTitleChange?: (title: string) => void
}

export const CategoryCard: FC<CategoryCardType> = ({
  emoji,
  title,
  currency,
  amount,
  onTitleChange,
  onEmojiChange,
}) => {
  return (
    <Card className={'flex flex-col gap-2'}>
      <EmojiTitle
        emoji={emoji}
        title={title}
        onEmojiChange={onEmojiChange}
        onTitleChange={onTitleChange}
      />
      <Balance balance={amount} currency={currency} signed />
    </Card>
  )
}

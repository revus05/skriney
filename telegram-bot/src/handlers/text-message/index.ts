import type { Context } from 'bot/init'

export const handleTextMessage = async (ctx: Context) => {
  if (!ctx.message || !ctx.message.text || !ctx.from) {
    await ctx.reply('Error no data.')
    return
  }

  void ctx.reply('Сообщение принял 123')

  const match = ctx.message.text.match(/([+-])?\s*(-?\d+([.,]\d+)?)/)
  if (!match) {
    void ctx.reply('Сумма не найдена')
    return
  }

  const sign = match[1]
  const numberString = match[2] as string

  const numberValue = parseFloat(numberString.replace(',', '.'))

  const isPositive = sign === '+'
  const value = isPositive ? numberValue : -numberValue

  const roundedValue = Math.round(100 * value) / 100

  await ctx.conversation.enter('createTransactionConversation', {
    value: roundedValue,
    messageText: ctx.message.text,
  })
}

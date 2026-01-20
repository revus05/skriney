import { Conversation } from '@grammyjs/conversations'
import type { Context } from 'bot/init'
import { type Context as GrammyContext } from 'grammy'
import { createTransaction } from '../model'
import { getCategoriesKeyboard } from 'features/category'
import { getBankAccountKeyboard } from 'features/bank-account'
import { getCurrenciesKeyboard } from 'features/currency'
import { getUser } from 'features/user'
import type { User } from '@prisma/client'
import { getCreateTransactionReply } from 'features/transaction/create-transaction/reply'

type CreateTransactionConversation = (
  conversation: Conversation<Context>,
  ctx: GrammyContext,
  arg: { value: number; messageText: string },
) => Promise<void>

export const createTransactionConversation: CreateTransactionConversation =
  async (conversation, ctx, { value, messageText }) => {
    const user: User | null = await getUser(ctx.from?.id)

    if (!user) {
      return
    }

    const currency = await getCurrency(
      ctx,
      conversation,
      user.useDefaultCurrency,
    )
    const categoryUuid = await getCategory(
      ctx,
      conversation,
      user.useDefaultCategory,
    )

    const bankAccountUuid = await getBankAccount(
      ctx,
      conversation,
      user.useDefaultBankAccount,
    )

    const createTransactionResponse = await createTransaction({
      categoryUuid,
      currency,
      bankAccountUuid,
      amount: value * 100,
      telegramId: ctx.from?.id || 0,
      description: messageText
        .replace(`${value}`, '')
        .replace(/\s+/g, ' ')
        .trim(),
    })

    void ctx.reply(getCreateTransactionReply(createTransactionResponse))
  }

type GetCurrency = (
  ctx: GrammyContext,
  conversation: Conversation<Context>,
  useDefaultCurrency: boolean,
) => Promise<string | undefined>
const getCurrency: GetCurrency = async (
  ctx: GrammyContext,
  conversation: Conversation<Context>,
  useDefaultCurrency: boolean,
) => {
  if (useDefaultCurrency) {
    return undefined
  }
  const message = await ctx.reply(`Выберите валюту для транзакции`, {
    reply_markup: await getCurrenciesKeyboard(),
  })
  const chooseCurrencyAction = await conversation.waitFor('callback_query:data')
  void chooseCurrencyAction.answerCallbackQuery()
  await ctx.api.deleteMessage(ctx.chat?.id || 0, message.message_id)
  return chooseCurrencyAction.callbackQuery.data
}

type GetCategory = (
  ctx: GrammyContext,
  conversation: Conversation<Context>,
  useDefaultCategory: boolean,
) => Promise<string | undefined>
const getCategory: GetCategory = async (
  ctx,
  conversation,
  useDefaultCategory,
) => {
  if (useDefaultCategory) {
    return undefined
  }

  const message = await ctx.reply(`Выберите категорию для транзакции`, {
    reply_markup: await getCategoriesKeyboard(ctx.from?.id || 0),
  })

  const chooseCategoryAction = await conversation.waitFor('callback_query:data')
  void chooseCategoryAction.answerCallbackQuery()
  await ctx.api.deleteMessage(ctx.chat?.id || 0, message.message_id)
  return chooseCategoryAction.callbackQuery.data
}

type GetBankAccount = (
  ctx: GrammyContext,
  conversation: Conversation<Context>,
  useDefaultBankAccount: boolean,
) => Promise<string | undefined>

const getBankAccount: GetBankAccount = async (
  ctx,
  conversation,
  useDefaultBankAccount,
) => {
  if (useDefaultBankAccount) {
    return undefined
  }

  const message = await ctx.reply(`Выберите счет для транзакции`, {
    reply_markup: await getBankAccountKeyboard(ctx.from?.id || 0),
  })

  const chooseBankAccountAction = await conversation.waitFor(
    'callback_query:data',
  )
  void chooseBankAccountAction.answerCallbackQuery()
  await ctx.api.deleteMessage(ctx.chat?.id || 0, message.message_id)
  return chooseBankAccountAction.callbackQuery.data
}

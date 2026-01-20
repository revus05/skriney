import { Conversation } from '@grammyjs/conversations'
import type { Context } from 'bot/init'
import type { Context as GrammyContext } from 'grammy'
import type { User } from '@prisma/client'
import { getUser } from 'features/user'
import { updateUser } from 'features/user'
import { userSettingsKeyboard } from '../keyboard'

type SettingsConversation = (
  conversation: Conversation<Context>,
  ctx: GrammyContext,
) => Promise<void>

export const settingsConversation: SettingsConversation = async (
  conversation,
  ctx,
) => {
  let user: User | null = await getUser(ctx.from?.id)

  if (!user) {
    void ctx.reply(
      'Ваш телеграм еще не привязан к аккаунту skriney. Вы можете это сделать по ссылке: https://skriney.online/settings',
    )
    return
  }

  const message = await ctx.reply('Настройки бота:', {
    reply_markup: userSettingsKeyboard(user),
  })

  let userAction = await conversation.waitFor('callback_query:data')
  while (userAction.callbackQuery.data !== 'back') {
    const action = userAction.callbackQuery.data
    void userAction.answerCallbackQuery()
    user = await performAction(action, user)
    await ctx.api.editMessageText(
      ctx.chat?.id || 0,
      message.message_id,
      `Настройки бота`,
      {
        reply_markup: userSettingsKeyboard(user),
      },
    )
    userAction = await conversation.waitFor('callback_query:data')
  }
  void userAction.answerCallbackQuery()

  await ctx.api.deleteMessage(ctx.chat?.id || 0, message.message_id)

  await ctx.reply('bye')
}

const performAction = async (action: string, user: User): Promise<User> => {
  switch (action) {
    case 'use-default-category-on':
      return await updateUser(user.telegramId, { useDefaultCategory: true })
    case 'use-default-category-off':
      return await updateUser(user.telegramId, { useDefaultCategory: false })
    case 'use-default-bank-account-on':
      return await updateUser(user.telegramId, { useDefaultBankAccount: true })
    case 'use-default-bank-account-off':
      return await updateUser(user.telegramId, { useDefaultBankAccount: false })
    case 'use-default-currency-on':
      return await updateUser(user.telegramId, { useDefaultCurrency: true })
    case 'use-default-currency-off':
      return await updateUser(user.telegramId, { useDefaultCurrency: false })
    default:
      return user
  }
}

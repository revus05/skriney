import {
  Bot,
  type Context as GrammyContext,
  session,
  type SessionFlavor,
} from 'grammy'
import { setCommands } from 'bot/commands'
import {
  type ConversationFlavor,
  conversations,
  createConversation,
} from '@grammyjs/conversations'
import { hydrate, type HydrateFlavor } from '@grammyjs/hydrate'
import { createTransactionConversation } from 'features/transaction'
import { settingsConversation } from 'features/settings'

type Session = object

export type BaseContext = HydrateFlavor<GrammyContext> & SessionFlavor<Session>

export type Context = BaseContext & ConversationFlavor<BaseContext>

const bot = new Bot<Context>(process.env.BOT_TOKEN || '')

void setCommands(bot)

bot.use(session({ initial: () => ({}) }))
bot.use(conversations())
bot.use(hydrate())

bot.use(createConversation(createTransactionConversation))
bot.use(createConversation(settingsConversation))

void bot.start()

export default bot

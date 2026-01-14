import type { Context } from 'bot/init'

export const handleSettingsCommand = async (ctx: Context) => {
  await ctx.conversation.enter('settingsConversation')
}

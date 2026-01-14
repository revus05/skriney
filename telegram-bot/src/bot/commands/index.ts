import type { Context } from 'bot/init'
import type { Bot } from 'grammy'

const commandList = [
  { command: 'start', description: 'Начать диалог' },
  {
    command: 'settings',
    description: 'Настройки бота',
  },
]

export const setCommands = async (bot: Bot<Context>) => {
  await bot.api.setMyCommands(
    commandList.map((commandListItem) => ({
      command: commandListItem.command,
      description: commandListItem.description,
    })),
  )
}

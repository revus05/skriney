import bot from 'bot/init'
import { handleStartCommand } from 'handlers/start-command'
import { handleTextMessage } from 'handlers/text-message'
import { handleSettingsCommand } from 'handlers/settings-command'

bot.command('start', handleStartCommand)
bot.command('settings', handleSettingsCommand)
bot.on('message:text', handleTextMessage)

console.log('Bot started!')

import { type Context } from 'bot/init'
import { connectTelegram } from 'features/connect-telegram'
import { getTelegramConnectionSuccessReply } from 'features/connect-telegram'
import { getUser } from 'features/user'
import type { User } from '@prisma/client'
import { createUser } from 'features/user'
import { updateUser } from 'features/user'
import { getTelegramConnectionFailureReply } from 'features/connect-telegram/reply/telegram-connection-failure.ts'

export const handleStartCommand = async (ctx: Context) => {
  const telegramId = ctx.from?.id
  const userUuid = ctx.message?.text?.split(' ')[1]

  if (!telegramId) return

  const user: User | null = await getUser(telegramId)

  if (!user) {
    await createUser({ uuid: userUuid || '', telegramId })
  }

  if (user && !user.uuid && userUuid) {
    await updateUser(telegramId, { uuid: userUuid })
  }
  if (userUuid) {
    const response = await connectTelegram({
      telegramId,
      userUuid,
    })

    if (response.success) {
      void ctx.reply(getTelegramConnectionSuccessReply(response.username))
    } else {
      void ctx.reply(getTelegramConnectionFailureReply(response.username))
    }
  }
}

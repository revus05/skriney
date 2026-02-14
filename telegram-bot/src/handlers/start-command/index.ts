import { type Context } from 'bot/init'
import { connectTelegram } from 'features/connect-telegram'
import { getTelegramConnectedResponse } from 'features/connect-telegram'
import { getUser } from 'features/user'
import type { User } from '@prisma/client'
import { createUser } from 'features/user'
import { updateUser } from 'features/user'

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
    void ctx.reply(getTelegramConnectedResponse(response.username))
  }
}

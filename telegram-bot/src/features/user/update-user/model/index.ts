import { PrismaClient, type User } from '@prisma/client'

type UpdateUser = (
  telegramId: number,
  updatedUser: Partial<User>,
) => Promise<User>

const prisma = new PrismaClient()

export const updateUser: UpdateUser = (
  telegramId: number,
  updatedUser: Partial<User>,
) =>
  prisma.user.update({
    data: updatedUser,
    where: {
      telegramId,
    },
  })

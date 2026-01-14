import { PrismaClient, type User } from '@prisma/client'

const prisma = new PrismaClient()

export const getUser = async (id?: number): Promise<User | null> =>
  prisma.user.findFirst({ where: { telegramId: id || 0 } })

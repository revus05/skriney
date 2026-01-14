import { PrismaClient, type User } from '@prisma/client'

type CreateUser = ({
  uuid,
  telegramId,
}: {
  uuid: string
  telegramId: number
}) => Promise<User>

const prisma = new PrismaClient()

export const createUser: CreateUser = async ({ uuid, telegramId }) =>
  prisma.user.create({
    data: {
      uuid,
      telegramId,
    },
  })

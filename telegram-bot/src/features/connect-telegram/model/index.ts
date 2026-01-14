import {
  type ConnectTelegramRequest,
  TelegramServiceClientImpl,
} from 'shared/proto'
import { rpc } from 'shared/grpc'

export const connectTelegram = async (request: ConnectTelegramRequest) => {
  const client = new TelegramServiceClientImpl(rpc)

  try {
    return await client.ConnectTelegram(request)
  } catch (err) {
    console.error('Ошибка:', err)
    throw err
  }
}

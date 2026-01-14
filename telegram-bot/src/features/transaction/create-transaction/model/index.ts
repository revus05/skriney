import { rpc } from 'shared/grpc'
import {
  type CreateTransactionRequest,
  TransactionServiceClientImpl,
} from 'shared/proto'

export const createTransaction = async (request: CreateTransactionRequest) => {
  const client = new TransactionServiceClientImpl(rpc)

  try {
    return await client.CreateTransaction(request)
  } catch (err) {
    console.error('Ошибка:', err)
    throw err
  }
}

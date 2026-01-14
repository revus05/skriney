import { rpc } from 'shared/grpc'
import {
  BankAccountServiceClientImpl,
  type GetBankAccountsRequest,
} from 'shared/proto'

export const getBankAccounts = async (request: GetBankAccountsRequest) => {
  const client = new BankAccountServiceClientImpl(rpc)

  try {
    return await client.GetBankAccounts(request)
  } catch (err) {
    console.error('Ошибка:', err)
    throw err
  }
}

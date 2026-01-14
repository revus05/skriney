import { rpc } from 'shared/grpc'
import {
  CategoryServiceClientImpl,
  type GetCategoriesRequest,
} from 'shared/proto'

export const getCategories = async (request: GetCategoriesRequest) => {
  const client = new CategoryServiceClientImpl(rpc)

  try {
    return await client.GetCategories(request)
  } catch (err) {
    console.error('Ошибка:', err)
    throw err
  }
}

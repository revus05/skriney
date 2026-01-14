import { createApi } from '@reduxjs/toolkit/query/react'
import {
  ApiResponse,
  BankAccountDTO,
  baseQuery,
  CreateBankAccountRequestDTO,
  UpdateBankAccountRequestDTO,
} from 'shared/api'

const bankAccountApi = createApi({
  reducerPath: 'bankAccountApi',
  baseQuery: baseQuery('bank-accounts'),
  endpoints: (builder) => ({
    getBankAccounts: builder.mutation<ApiResponse<BankAccountDTO[]>, void>({
      query: () => ({
        url: '',
        method: 'GET',
      }),
    }),
    createBankAccount: builder.mutation<
      ApiResponse<BankAccountDTO>,
      CreateBankAccountRequestDTO
    >({
      query: (body) => ({
        url: '',
        method: 'POST',
        body,
      }),
    }),
    deleteBankAccount: builder.mutation<
      ApiResponse<BankAccountDTO>,
      { uuid: string }
    >({
      query: ({ uuid }) => ({
        url: `${uuid}`,
        method: 'DELETE',
      }),
    }),
    updateBankAccount: builder.mutation<
      ApiResponse<BankAccountDTO>,
      { uuid: string; body: UpdateBankAccountRequestDTO }
    >({
      query: ({ uuid, body }) => ({
        url: `${uuid}`,
        method: 'PATCH',
        body,
      }),
    }),
  }),
})

export default bankAccountApi
export const {
  useGetBankAccountsMutation,
  useCreateBankAccountMutation,
  useDeleteBankAccountMutation,
  useUpdateBankAccountMutation,
} = bankAccountApi

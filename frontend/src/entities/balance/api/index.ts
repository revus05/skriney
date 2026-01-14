import { createApi } from '@reduxjs/toolkit/query/react'
import {
  ApiResponse,
  BalanceSummaryDTO,
  baseQuery,
  DailyBalanceDTO,
} from 'shared/api'
import { BalancePeriod } from 'shared/constants/balancePeriod'

const dailyBalanceApi = createApi({
  reducerPath: 'balanceApi',
  baseQuery: baseQuery('balance'),
  endpoints: (builder) => ({
    getBalanceSummary: builder.mutation<ApiResponse<BalanceSummaryDTO>, void>({
      query: () => ({
        url: '/summary',
        method: 'GET',
      }),
    }),
    getDailyBalances: builder.mutation<
      ApiResponse<DailyBalanceDTO[]>,
      { period?: keyof typeof BalancePeriod; bankAccountUuid?: string }
    >({
      query: (params) => ({
        url: '',
        method: 'GET',
        params,
      }),
    }),
  }),
})

export default dailyBalanceApi
export const { useGetBalanceSummaryMutation, useGetDailyBalancesMutation } =
  dailyBalanceApi

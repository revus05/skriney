import { createApi } from '@reduxjs/toolkit/query/react'
import {
  ApiResponse,
  baseQuery,
  CategoryDTO,
  CategoryStatDTO,
  CreateCategoryRequestDTO,
  UpdateCategoryRequestDTO,
} from 'shared/api'
import { BalancePeriod } from 'shared/constants/balancePeriod'

const categoriesApi = createApi({
  reducerPath: 'categoriesApi',
  baseQuery: baseQuery('categories'),
  endpoints: (builder) => ({
    getCategories: builder.mutation<ApiResponse<CategoryDTO[]>, void>({
      query: () => ({
        url: '',
        method: 'GET',
      }),
    }),
    createCategory: builder.mutation<
      ApiResponse<CategoryDTO>,
      CreateCategoryRequestDTO
    >({
      query: (body) => ({
        url: '',
        method: 'POST',
        body,
      }),
    }),
    deleteCategory: builder.mutation<
      ApiResponse<CategoryDTO>,
      { uuid: string }
    >({
      query: ({ uuid }) => ({
        url: uuid,
        method: 'DELETE',
      }),
    }),
    getCategoriesStats: builder.mutation<
      ApiResponse<CategoryStatDTO[]>,
      { period?: keyof typeof BalancePeriod; bankAccountUuid?: string }
    >({
      query: (params) => ({
        url: '/stats',
        method: 'GET',
        params,
      }),
    }),
    updateCategory: builder.mutation<
      ApiResponse<CategoryDTO>,
      { uuid: string; body: UpdateCategoryRequestDTO }
    >({
      query: ({ uuid, body }) => ({
        url: uuid,
        method: 'PATCH',
        body,
      }),
    }),
  }),
})

export default categoriesApi
export const {
  useGetCategoriesMutation,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoriesStatsMutation,
  useUpdateCategoryMutation,
} = categoriesApi

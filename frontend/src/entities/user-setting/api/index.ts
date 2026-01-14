import { createApi } from '@reduxjs/toolkit/query/react'
import {
  ApiResponse,
  baseQuery,
  UpdateAnimationEnabledRequestDTO,
  UpdateDefaultBankAccountRequestDTO,
  UpdateDefaultCurrencyRequestDTO,
  UpdateLanguageRequestDTO,
  UpdateThemeRequestDTO,
  UserSettingsDTO,
} from 'shared/api'

const userSettingsApi = createApi({
  reducerPath: 'userSettingsApi',
  baseQuery: baseQuery('user-settings'),
  endpoints: (builder) => ({
    updateDefaultCurrency: builder.mutation<
      ApiResponse<UserSettingsDTO>,
      UpdateDefaultCurrencyRequestDTO
    >({
      query: (body) => ({
        url: '/update-default-currency',
        method: 'POST',
        body,
      }),
    }),
    updateDefaultCategory: builder.mutation<
      ApiResponse<UserSettingsDTO>,
      UpdateDefaultBankAccountRequestDTO
    >({
      query: (body) => ({
        url: '/update-default-category',
        method: 'POST',
        body,
      }),
    }),
    updateTheme: builder.mutation<
      ApiResponse<UserSettingsDTO>,
      UpdateThemeRequestDTO
    >({
      query: (body) => ({
        url: '/update-theme',
        method: 'POST',
        body,
      }),
    }),
    updateDefaultBankAccount: builder.mutation<
      ApiResponse<UserSettingsDTO>,
      UpdateDefaultBankAccountRequestDTO
    >({
      query: (body) => ({
        url: '/update-default-bank-account',
        method: 'POST',
        body,
      }),
    }),
    updateLanguage: builder.mutation<
      ApiResponse<UserSettingsDTO>,
      UpdateLanguageRequestDTO
    >({
      query: (body) => ({
        url: '/update-language',
        method: 'POST',
        body,
      }),
    }),
    updateAnimationEnabled: builder.mutation<
      ApiResponse<UserSettingsDTO>,
      UpdateAnimationEnabledRequestDTO
    >({
      query: (body) => ({
        url: '/update-animation-enabled',
        method: 'POST',
        body,
      }),
    }),
  }),
})

export default userSettingsApi
export const {
  useUpdateDefaultCurrencyMutation,
  useUpdateDefaultCategoryMutation,
  useUpdateThemeMutation,
  useUpdateDefaultBankAccountMutation,
  useUpdateLanguageMutation,
  useUpdateAnimationEnabledMutation,
} = userSettingsApi

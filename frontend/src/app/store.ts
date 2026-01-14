import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { userApi, userSlice } from 'entities/user'
import { signUpFormSlice } from 'features/auth/sign-up'
import { signInFormSlice } from 'features/auth/sign-in'
import { updateBankAccountsSlice } from 'features/bank-accounts/update-bank-account'
import { categoriesApi, categorySlice } from 'entities/category'
import { transactionsApi, transactionSlice } from 'entities/transaction'
import { bankAccountApi, bankAccountsSlice } from 'entities/bank-account'
import { userSettingsApi } from 'entities/user-setting'
import { balanceApi, balanceSlice } from 'entities/balance'
import { fileApi } from 'entities/file'
import { updateCategoriesSlice } from 'features/categories/update-category'
import { updateTransactionSlice } from 'features/transactions/update-transaction'

const rootReducer = {
  userSlice,
  signUpFormSlice,
  signInFormSlice,
  categorySlice,
  transactionSlice,
  bankAccountsSlice,
  updateBankAccountsSlice,
  updateCategoriesSlice,
  updateTransactionSlice,
  balanceSlice,
  [userApi.reducerPath]: userApi.reducer,
  [categoriesApi.reducerPath]: categoriesApi.reducer,
  [transactionsApi.reducerPath]: transactionsApi.reducer,
  [bankAccountApi.reducerPath]: bankAccountApi.reducer,
  [userSettingsApi.reducerPath]: userSettingsApi.reducer,
  [balanceApi.reducerPath]: balanceApi.reducer,
  [fileApi.reducerPath]: fileApi.reducer,
}

const mainReducer = combineReducers(rootReducer)

export type RootState = ReturnType<typeof mainReducer>

export const makeStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: mainReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(userApi.middleware)
        .concat(categoriesApi.middleware)
        .concat(transactionsApi.middleware)
        .concat(bankAccountApi.middleware)
        .concat(userSettingsApi.middleware)
        .concat(balanceApi.middleware)
        .concat(fileApi.middleware),
    preloadedState,
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type AppDispatch = AppStore['dispatch']

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TransactionDTO, UpdateTransactionRequestDTO } from 'shared/api'

type InitialState = {
  transactions: TransactionDTO[]
}

const initialState: InitialState = {
  transactions: [],
}

const transactionSlice = createSlice({
  name: 'transactionSlice',
  initialState,
  reducers: {
    setTransactions: (state, action: PayloadAction<TransactionDTO[]>) => {
      state.transactions = action.payload
    },
    addTransaction: (state, action: PayloadAction<TransactionDTO>) => {
      state.transactions = [action.payload, ...state.transactions]
    },
    deleteTransaction: (state, action: PayloadAction<string>) => {
      state.transactions = state.transactions.filter(
        (transaction) => transaction.uuid !== action.payload,
      )
    },
    updateTransaction: (state, action: PayloadAction<TransactionDTO>) => {
      state.transactions = state.transactions.map(
        (transaction: TransactionDTO) =>
          transaction.uuid === action.payload.uuid
            ? action.payload
            : transaction,
      )
    },
    positiveUpdateTransaction: (
      state,
      action: PayloadAction<UpdateTransactionRequestDTO & { uuid: string }>,
    ) => {
      state.transactions = state.transactions.map(
        (transaction: TransactionDTO) =>
          transaction.uuid === action.payload.uuid
            ? { ...transaction, ...action.payload }
            : transaction,
      )
    },
  },
})

export const {
  setTransactions,
  addTransaction,
  deleteTransaction,
  updateTransaction,
  positiveUpdateTransaction,
} = transactionSlice.actions
export default transactionSlice.reducer

import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type InitialState = {
  updateModalOpen: boolean
  transactionUuid: string
}

const initialState: InitialState = {
  updateModalOpen: false,
  transactionUuid: '',
}

const updateTransactionSlice = createSlice({
  name: 'updateTransactionSlice',
  initialState,
  reducers: {
    updateTransactionModalOpenFn: (state, action: PayloadAction<boolean>) => {
      state.updateModalOpen = action.payload
    },
    updateTransactionUuid: (state, action: PayloadAction<string>) => {
      state.transactionUuid = action.payload
    },
  },
})

export const { updateTransactionModalOpenFn, updateTransactionUuid } =
  updateTransactionSlice.actions
export default updateTransactionSlice.reducer

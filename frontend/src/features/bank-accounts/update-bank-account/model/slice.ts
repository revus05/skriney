import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type InitialState = {
  updateModalOpen: boolean
  bankAccountUuid: string
}

const initialState: InitialState = {
  updateModalOpen: false,
  bankAccountUuid: '',
}

const updateBankAccountsSlice = createSlice({
  name: 'updateBankAccountsSlice',
  initialState,
  reducers: {
    updateBankAccountModalOpenFn: (state, action: PayloadAction<boolean>) => {
      state.updateModalOpen = action.payload
    },
    updateBankAccountUuid: (state, action: PayloadAction<string>) => {
      state.bankAccountUuid = action.payload
    },
  },
})

export const { updateBankAccountModalOpenFn, updateBankAccountUuid } =
  updateBankAccountsSlice.actions
export default updateBankAccountsSlice.reducer

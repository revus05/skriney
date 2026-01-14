import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type InitialState = {
  showPassword: boolean
}

const initialState: InitialState = {
  showPassword: false,
}

const signInFormSlice = createSlice({
  name: 'signInFormSlice',
  initialState,
  reducers: {
    setShowPassword: (state, action: PayloadAction<boolean>) => {
      state.showPassword = action.payload
    },
  },
})

export const { setShowPassword } = signInFormSlice.actions
export default signInFormSlice.reducer

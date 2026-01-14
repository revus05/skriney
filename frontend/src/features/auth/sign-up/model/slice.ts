import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type InitialState = {
  showPassword: boolean
  showRepeatPassword: boolean
}

const initialState: InitialState = {
  showPassword: false,
  showRepeatPassword: false,
}

const signUpFormSlice = createSlice({
  name: 'signUpFormSlice',
  initialState,
  reducers: {
    setShowPassword: (state, action: PayloadAction<boolean>) => {
      state.showPassword = action.payload
    },
    setShowRepeatPassword: (state, action: PayloadAction<boolean>) => {
      state.showRepeatPassword = action.payload
    },
  },
})

export const { setShowPassword, setShowRepeatPassword } =
  signUpFormSlice.actions
export default signUpFormSlice.reducer

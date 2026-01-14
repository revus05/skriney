import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserDTO, UserSettingsDTO } from 'shared/api'

type InitialState = {
  user: UserDTO | null
}

const initialState: InitialState = {
  user: null,
}

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    signIn: (state, action: PayloadAction<UserDTO>) => {
      state.user = action.payload
    },
    signOut: (state) => {
      state.user = null
    },
    updateUserImage: (state, action: PayloadAction<string>) => {
      if (!state.user) {
        return
      }

      state.user.image = action.payload
    },
    setUserSettings: (state, action: PayloadAction<UserSettingsDTO>) => {
      if (state.user) {
        state.user.userSettings = action.payload
      }
    },
    updateUserLanguage: (state, action: PayloadAction<'EN' | 'RU'>) => {
      if (state.user) {
        state.user.userSettings.language = action.payload
      }
    },
  },
})

export const {
  signIn,
  updateUserImage,
  signOut,
  setUserSettings,
  updateUserLanguage,
} = userSlice.actions
export default userSlice.reducer

import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type InitialState = {
  updateModalOpen: boolean
  categoryUuid: string
}

const initialState: InitialState = {
  updateModalOpen: false,
  categoryUuid: '',
}

const updateCategoriesSlice = createSlice({
  name: 'updateCategoriesSlice',
  initialState,
  reducers: {
    updateCategoryModalOpenFn: (state, action: PayloadAction<boolean>) => {
      state.updateModalOpen = action.payload
    },
    updateCategoryUuid: (state, action: PayloadAction<string>) => {
      state.categoryUuid = action.payload
    },
  },
})

export const { updateCategoryModalOpenFn, updateCategoryUuid } =
  updateCategoriesSlice.actions
export default updateCategoriesSlice.reducer

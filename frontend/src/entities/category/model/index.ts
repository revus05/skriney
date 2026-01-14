import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  CategoryDTO,
  CategoryStatDTO,
  UpdateCategoryRequestDTO,
} from 'shared/api'

type InitialState = {
  categories: CategoryDTO[]
  stats: CategoryStatDTO[]
}

const initialState: InitialState = {
  categories: [],
  stats: [],
}

const categorySlice = createSlice({
  name: 'categorySlice',
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<CategoryDTO[]>) => {
      state.categories = action.payload
    },
    addCategory: (state, action: PayloadAction<CategoryDTO>) => {
      state.categories.push(action.payload)
    },
    deleteCategory: (state, action: PayloadAction<string>) => {
      state.categories = state.categories.filter(
        (category) => category.uuid !== action.payload,
      )
    },
    setCategoriesStats: (state, action: PayloadAction<CategoryStatDTO[]>) => {
      state.stats = action.payload
    },
    updateCategory: (state, action: PayloadAction<CategoryDTO>) => {
      state.categories = state.categories.map((category) =>
        category.uuid === action.payload.uuid ? action.payload : category,
      )
    },
    positiveUpdateCategory: (
      state,
      action: PayloadAction<UpdateCategoryRequestDTO & { uuid: string }>,
    ) => {
      state.categories = state.categories.map((category) =>
        category.uuid === action.payload.uuid
          ? { ...category, ...action.payload }
          : category,
      )
    },
  },
})

export const {
  setCategories,
  addCategory,
  deleteCategory,
  setCategoriesStats,
  updateCategory,
  positiveUpdateCategory,
} = categorySlice.actions
export default categorySlice.reducer

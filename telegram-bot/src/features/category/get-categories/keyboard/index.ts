import { getCategories } from '../model'
import type { Category } from 'shared/proto'
import { InlineKeyboard } from 'grammy'

export const getCategoriesKeyboard = async (telegramId: number) => {
  const getCategoriesResponse = await getCategories({
    telegramId,
  })

  if (!getCategoriesResponse.status) {
    return new InlineKeyboard()
  }

  const categoriesKeyboard = new InlineKeyboard()

  getCategoriesResponse.categories.forEach((category: Category, i: number) => {
    if (i % 2 == 0) {
      categoriesKeyboard.row()
    }
    categoriesKeyboard.text(
      `${category.emoji} ${category.title}`,
      category.uuid,
    )
  })

  return categoriesKeyboard
}

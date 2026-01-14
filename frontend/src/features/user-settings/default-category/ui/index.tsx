'use client'

import { Select, SelectItem } from 'shared/ui'
import { useState } from 'react'
import { useUpdateDefaultCategorySubmit } from '../model'
import { useAppSelector } from 'shared/lib'
import { useTranslation } from 'shared/i18n'
import { useGetCategories } from 'entities/category'

export const UpdateDefaultCategorySelect = () => {
  const updateDefaultCategory = useUpdateDefaultCategorySubmit()
  const { categories } = useGetCategories()

  const defaultCategory =
    useAppSelector(
      (state) => state.userSlice.user?.userSettings?.defaultCategory,
    ) || null

  const [selectedCategory, setSelectedCategory] = useState<string>(
    defaultCategory?.uuid || '',
  )

  const handleSelectCategoryChange = (newValue: string) => {
    setSelectedCategory(newValue)
    void updateDefaultCategory({ uuid: newValue })
  }

  const displayCategories =
    defaultCategory && !categories.some((c) => c.uuid === defaultCategory.uuid)
      ? [...categories, defaultCategory]
      : categories

  const t = useTranslation()

  return (
    <Select
      label={'default-category'}
      className={'w-37.5'}
      placeholder={t('settings.list.defaultCategory')}
      value={selectedCategory}
      onValueChangeAction={handleSelectCategoryChange}
    >
      {displayCategories.map((category) => (
        <SelectItem key={category.uuid}>
          {category.emoji
            ? `${category.emoji} ${category.title}`
            : category.title}
        </SelectItem>
      ))}
    </Select>
  )
}

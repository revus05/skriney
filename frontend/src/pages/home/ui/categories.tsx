'use client'

import {
  CategoryCard,
  useGetCategories,
  useGetCategoriesStats,
  useUpdateCategory,
} from 'entities/category'
import { Translate } from 'shared/ui'
import { Currency } from 'shared/constants/currencies'

export const CategoriesHome = () => {
  const { categories } = useGetCategories()
  const { categoriesStats } = useGetCategoriesStats()

  const updateCategory = useUpdateCategory()

  if (categories.length === 0) {
    return null
  }

  return (
    <div className={'flex flex-col gap-4'}>
      <h2 className={'text-xl font-bold'}>
        <Translate value={'home.categories.title'} />
      </h2>
      <div className={'flex flex-wrap gap-4'}>
        {categories.map((category) => (
          <CategoryCard
            key={category.uuid}
            title={category.title}
            emoji={category.emoji || undefined}
            amount={
              categoriesStats.find((stat) => stat.uuid === category.uuid)
                ?.totalBalanceInUsd ?? 0
            }
            currency={Currency.USD}
            onEmojiChange={(emoji) => updateCategory(category.uuid, { emoji })}
            onTitleChange={(title) => updateCategory(category.uuid, { title })}
          />
        ))}
      </div>
    </div>
  )
}

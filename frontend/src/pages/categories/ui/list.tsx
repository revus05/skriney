'use client'

import { Balance, Button, Card, EmojiTitle, Translate } from 'shared/ui'
import { CurrencySymbols } from 'shared/constants/currencies'
import {
  useGetCategories,
  useDeleteCategory,
  useGetCategoriesStats,
  useUpdateCategory,
} from 'entities/category'
import { Popover, PopoverContent, PopoverTrigger } from '@heroui/react'
import {
  UpdateCategoryModal,
  updateCategoryModalOpenFn,
  updateCategoryUuid,
} from 'features/categories/update-category'
import { useAppDispatch } from 'shared/lib'
import { useState } from 'react'
import { ConfirmDeleteCategoryModal } from 'features/categories/confirm-delete-category'

export const CategoriesList = () => {
  const dispatch = useAppDispatch()

  const { categories } = useGetCategories()
  const { categoriesStats } = useGetCategoriesStats()
  const updateCategory = useUpdateCategory()
  const deleteCategory = useDeleteCategory()

  const [openPopoverUuid, setOpenPopoverUuid] = useState<string | null>(null)
  const [openCategoryDeleteConfirm, setOpenCategoryDeleteConfirm] =
    useState(false)
  const [deleteCategoryUuid, setDeleteCategoryUuid] = useState<string | null>(
    null,
  )

  const handleEditClicked = (uuid: string) => {
    dispatch(updateCategoryModalOpenFn(true))
    dispatch(updateCategoryUuid(uuid))
    setOpenPopoverUuid(null)
  }

  const handleDeleteClicked = (uuid: string) => {
    setOpenCategoryDeleteConfirm(true)
    setDeleteCategoryUuid(uuid)
    setOpenPopoverUuid(null)
  }

  return (
    <div className={'flex flex-col gap-2.5'}>
      {categories.map((category) => (
        <Card
          className={'flex justify-between gap-2.5 rounded-xl px-4 py-2'}
          key={category.uuid}
        >
          <div className={'flex items-center gap-2.5'}>
            <EmojiTitle
              emoji={category.emoji || undefined}
              title={category.title}
              onEmojiChange={(emoji) =>
                updateCategory(category.uuid, { emoji })
              }
              onTitleChange={(title) =>
                updateCategory(category.uuid, { title })
              }
            />
            <span className={'text-text-neutral-tertiary text-base font-bold'}>
              •
            </span>
            <Balance
              signed
              withColor
              balance={
                categoriesStats.find((stat) => stat.uuid === category.uuid)
                  ?.totalBalanceInUsd ?? 0
              }
              currency={CurrencySymbols.USD}
            />
          </div>
          <Popover
            placement="bottom-end"
            isOpen={openPopoverUuid === category.uuid}
            onOpenChange={(open) => {
              setOpenPopoverUuid(open ? category.uuid : null)
            }}
          >
            <PopoverTrigger>
              <Button variant="icon" iconStart="moreVertical" />
            </PopoverTrigger>
            <PopoverContent
              className={'bg-bg-neutral-primary rounded-2xl border p-1'}
            >
              <div className="flex flex-col items-center gap-2.5">
                <Button
                  variant={'ghost'}
                  iconStart={'edit'}
                  className={
                    'text-text-neutral-tertiary w-full rounded-xl px-3 py-2 font-bold'
                  }
                  onClick={() => handleEditClicked(category.uuid)}
                >
                  <Translate value={'categories.update.update'} />
                </Button>
                <Button
                  variant={'ghost'}
                  iconStart={'trashBin'}
                  className={
                    '[&_svg]:fill-icon-semantic-error-primary text-text-semantic-error-primary w-full rounded-xl px-3 py-2 font-bold'
                  }
                  onClick={() => handleDeleteClicked(category.uuid)}
                >
                  <Translate value={'categories.delete'} />
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </Card>
      ))}

      <UpdateCategoryModal />
      <ConfirmDeleteCategoryModal
        open={openCategoryDeleteConfirm}
        openChangedAction={setOpenCategoryDeleteConfirm}
        onSubmitAction={() =>
          deleteCategoryUuid && deleteCategory({ uuid: deleteCategoryUuid })
        }
      />
    </div>
  )
}

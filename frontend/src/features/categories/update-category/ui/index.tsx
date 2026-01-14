'use client'

import {
  Button,
  Icons,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Translate,
} from 'shared/ui'
import {
  UpdateCategoryFormData,
  updateCategoryModalOpenFn,
  useUpdateCategoryForm,
  useUpdateCategorySubmit,
} from '../model'
import { useTranslation } from 'shared/i18n'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'shared/lib'
import { Popover, PopoverContent, PopoverTrigger } from '@heroui/react'
import Picker from '@emoji-mart/react'

export const UpdateCategoryModal = () => {
  const updateCategoryModalOpen = useAppSelector(
    (state) => state.updateCategoriesSlice.updateModalOpen,
  )

  const uuid = useAppSelector(
    (state) => state.updateCategoriesSlice.categoryUuid,
  )

  const categories = useAppSelector((state) => state.categorySlice.categories)

  const dispatch = useAppDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setFocus,
    setValue,
  } = useUpdateCategoryForm()

  const handleClose = () => {
    dispatch(updateCategoryModalOpenFn(false))
    reset()
  }

  const onSubmit = useUpdateCategorySubmit(uuid, handleClose)

  const t = useTranslation()

  const updateCategory = categories.find((category) => category.uuid === uuid)

  const handleSetFocus = (name: string) =>
    setFocus(name as keyof UpdateCategoryFormData)

  useEffect(() => {
    if (!updateCategory) {
      return
    }

    setValue('title', updateCategory.title)
    setValue('emoji', updateCategory.emoji || '')
  }, [setValue, updateCategory, uuid, updateCategoryModalOpen])

  const [displayedEmoji, setDisplayedEmoji] = useState('')

  useEffect(() => {
    setDisplayedEmoji(updateCategory?.emoji || '')
  }, [updateCategory])

  const handleEmojiSelect = ({ native }: { native: string }) => {
    setValue('emoji', native)
    setDisplayedEmoji(native)
  }

  useEffect(() => {
    if (updateCategoryModalOpen) setFocus('title')
  }, [updateCategoryModalOpen, setFocus])

  if (!updateCategory) return null

  return (
    <Modal
      isOpen={updateCategoryModalOpen}
      onOpenChange={(newValue) => dispatch(updateCategoryModalOpenFn(newValue))}
      hideCloseButton
    >
      <ModalContent
        className={'bg-bg-neutral-tertiary w-85 rounded-3xl border p-4'}
      >
        <div className={'flex flex-col gap-4'}>
          <ModalHeader className="flex items-center justify-between gap-1 p-0">
            <h2>
              <Translate value={'categories.update.sectionTitle'} />
            </h2>
            <Button variant="icon" iconStart={'x'} onClick={handleClose} />
          </ModalHeader>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={'flex flex-col gap-4'}
          >
            <ModalBody className={'p-0'}>
              <div className={'flex items-start gap-2'}>
                <Popover placement="right">
                  <PopoverTrigger className={'h-9'}>
                    {displayedEmoji ? (
                      <span className={'cursor-pointer pr-1 pl-2'}>
                        {displayedEmoji}
                      </span>
                    ) : (
                      <Icons.emojiPlaceholder
                        className={'shrink-0 cursor-pointer'}
                      />
                    )}
                  </PopoverTrigger>
                  <PopoverContent className={'bg-transparent p-0'}>
                    <Picker
                      data={async () => {
                        const response = await fetch(
                          'https://cdn.jsdelivr.net/npm/@emoji-mart/data',
                        )
                        return response.json()
                      }}
                      onEmojiSelect={handleEmojiSelect}
                      previewPosition="none"
                      skinTonePosition="none"
                    />
                  </PopoverContent>
                </Popover>
                <div className={'grow [&_>_div]:grow'}>
                  <Input
                    {...register('title')}
                    errorMessage={errors.title?.message}
                    placeholder={t('categories.update.title')}
                    setFocus={handleSetFocus}
                  />
                </div>
              </div>
            </ModalBody>
            <ModalFooter className={'flex justify-center p-0'}>
              <Button type={'submit'}>
                <Translate value={'categories.update.update'} />
              </Button>
            </ModalFooter>
          </form>
        </div>
      </ModalContent>
    </Modal>
  )
}

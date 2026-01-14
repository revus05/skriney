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
  UpdateBankAccountFormData,
  updateBankAccountModalOpenFn,
  useUpdateBankAccountForm,
  useUpdateBankAccountSubmit,
} from '../model'
import { useTranslation } from 'shared/i18n'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'shared/lib'
import { Popover, PopoverContent, PopoverTrigger } from '@heroui/react'
import Picker from '@emoji-mart/react'

export const UpdateBankAccountModal = () => {
  const updateBankAccountModalOpen = useAppSelector(
    (state) => state.updateBankAccountsSlice.updateModalOpen,
  )

  const uuid = useAppSelector(
    (state) => state.updateBankAccountsSlice.bankAccountUuid,
  )

  const bankAccounts = useAppSelector(
    (state) => state.bankAccountsSlice.bankAccounts,
  )

  const dispatch = useAppDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setFocus,
    setValue,
  } = useUpdateBankAccountForm()

  const handleClose = () => {
    dispatch(updateBankAccountModalOpenFn(false))
    reset()
  }

  const onSubmit = useUpdateBankAccountSubmit(uuid, handleClose)

  const t = useTranslation()

  const updateBankAccount = bankAccounts.find(
    (bankAccount) => bankAccount.uuid === uuid,
  )

  const handleSetFocus = (name: string) =>
    setFocus(name as keyof UpdateBankAccountFormData)

  useEffect(() => {
    if (!updateBankAccount) {
      return
    }

    setValue('title', updateBankAccount.title)
    setValue('emoji', updateBankAccount.emoji ?? '')
  }, [setValue, updateBankAccount, uuid, updateBankAccountModalOpen])

  const [displayedEmoji, setDisplayedEmoji] = useState('')

  useEffect(() => {
    setDisplayedEmoji(updateBankAccount?.emoji || '')
  }, [updateBankAccount])

  const handleEmojiSelect = ({ native }: { native: string }) => {
    setValue('emoji', native)
    setDisplayedEmoji(native)
  }

  useEffect(() => {
    if (updateBankAccountModalOpen) setFocus('title')
  }, [updateBankAccountModalOpen, setFocus])

  if (!updateBankAccount) return null

  return (
    <Modal
      isOpen={updateBankAccountModalOpen}
      onOpenChange={(newValue) =>
        dispatch(updateBankAccountModalOpenFn(newValue))
      }
      hideCloseButton
    >
      <ModalContent
        className={'bg-bg-neutral-tertiary w-85 rounded-3xl border p-4'}
      >
        <div className={'flex flex-col gap-4'}>
          <ModalHeader className="flex items-center justify-between gap-1 p-0">
            <h2>
              <Translate value={'bankAccounts.update.sectionTitle'} />
            </h2>
            <Button variant="icon" iconStart={'x'} onClick={handleClose} />
          </ModalHeader>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={'flex flex-col gap-4'}
          >
            <ModalBody className={'p-0'}>
              <div className={'flex items-center gap-2'}>
                <Popover placement="right">
                  <PopoverTrigger>
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
                    placeholder={t('bankAccounts.update.title')}
                    setFocus={handleSetFocus}
                  />
                </div>
              </div>
            </ModalBody>
            <ModalFooter className={'flex justify-center p-0'}>
              <Button type={'submit'}>
                <Translate value={'bankAccounts.update.update'} />
              </Button>
            </ModalFooter>
          </form>
        </div>
      </ModalContent>
    </Modal>
  )
}

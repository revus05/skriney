'use client'

import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Translate,
} from 'shared/ui'
import {
  UpdateTransactionFormData,
  updateTransactionModalOpenFn,
  useUpdateTransactionSubmit,
  useUpdateTransactionForm,
} from '../model'
import { useTranslation } from 'shared/i18n'
import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'shared/lib'
import { Controller } from 'react-hook-form'
import { CurrencySymbols } from 'shared/constants/currencies'
import { CreateBankAccountButton } from 'features/bank-accounts/create-bank-account'
import { CreateCategoryButton } from 'features/categories/create-category'
import { useGetBankAccounts } from 'entities/bank-account'
import { useGetCategories } from 'entities/category'

export const UpdateTransactionModal = () => {
  const updateTransactionModalOpen = useAppSelector(
    (state) => state.updateTransactionSlice.updateModalOpen,
  )

  const uuid = useAppSelector(
    (state) => state.updateTransactionSlice.transactionUuid,
  )

  const transactions = useAppSelector(
    (state) => state.transactionSlice.transactions,
  )

  const dispatch = useAppDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setFocus,
    setValue,
    control,
  } = useUpdateTransactionForm()

  const handleClose = () => {
    dispatch(updateTransactionModalOpenFn(false))
    reset()
  }

  const onSubmit = useUpdateTransactionSubmit(uuid, handleClose)

  const t = useTranslation()

  const updateTransaction = transactions.find(
    (category) => category.uuid === uuid,
  )

  const handleSetFocus = (name: string) =>
    setFocus(name as keyof UpdateTransactionFormData)

  useEffect(() => {
    if (!updateTransaction) {
      return
    }

    setValue(
      'amount',
      updateTransaction.amount > 0
        ? `+${updateTransaction.amount}`
        : `${updateTransaction.amount}`,
    )
    setValue('bankAccountUuid', updateTransaction.bankAccountUuid || '')
    setValue('categoryUuid', updateTransaction.category?.uuid || '')
    setValue('currency', updateTransaction.currency)
    setValue('description', updateTransaction.description)
  }, [setValue, updateTransaction, uuid, updateTransactionModalOpen])

  const bankAccountsData = useGetBankAccounts()
  const { categories: categoriesData } = useGetCategories()

  const bankAccountOptions = bankAccountsData.map((bankAccount) => ({
    key: bankAccount.uuid,
    label: bankAccount.emoji
      ? `${bankAccount.emoji} ${bankAccount.title}`
      : bankAccount.title,
  }))

  const categoryOptions = categoriesData.map((category) => ({
    key: category.uuid,
    label: category.emoji
      ? `${category.emoji} ${category.title}`
      : category.title,
  }))

  useEffect(() => {
    if (updateTransactionModalOpen) setFocus('amount')
  }, [updateTransactionModalOpen, setFocus])

  if (!updateTransaction) return null

  return (
    <Modal
      isOpen={updateTransactionModalOpen}
      onOpenChange={(newValue) =>
        dispatch(updateTransactionModalOpenFn(newValue))
      }
      hideCloseButton
    >
      <ModalContent
        className={'bg-bg-neutral-tertiary w-95 rounded-3xl border p-4'}
      >
        <div className={'flex flex-col gap-4'}>
          <ModalHeader className="flex items-center justify-between gap-1 p-0">
            <h2>
              <Translate value={'transactions.update.sectionTitle'} />
            </h2>
            <Button variant="icon" iconStart={'x'} onClick={handleClose} />
          </ModalHeader>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={'flex flex-col gap-4'}
          >
            <ModalBody className={'p-0'}>
              <div className={'flex items-start gap-4'}>
                <div className={'grow'}>
                  <Input
                    {...register('amount')}
                    errorMessage={errors.amount?.message}
                    placeholder={t('transactions.update.amount')}
                    setFocus={handleSetFocus}
                  />
                </div>
                <Controller
                  name="currency"
                  control={control}
                  render={({ field }) => (
                    <Select
                      label={'currency'}
                      placeholder={t('transactions.update.currency')}
                      isInvalid={!!errors.currency?.message}
                      errorMessage={errors.currency?.message}
                      value={field.value}
                      onValueChangeAction={field.onChange}
                      className={'w-32'}
                    >
                      {Object.entries(CurrencySymbols).map(([key, symbol]) => (
                        <SelectItem key={key}>
                          {symbol === key ? key : `${symbol} ${key}`}
                        </SelectItem>
                      ))}
                    </Select>
                  )}
                />
              </div>
              <div className={'flex gap-4'}>
                <Controller
                  name="bankAccountUuid"
                  control={control}
                  render={({ field }) => (
                    <Select
                      label={'bank-account'}
                      placeholder={t('transactions.update.bankAccount')}
                      isInvalid={!!errors.bankAccountUuid?.message}
                      errorMessage={errors.bankAccountUuid?.message}
                      value={field.value}
                      onValueChangeAction={field.onChange}
                    >
                      {bankAccountOptions.map((bankAccount) => (
                        <SelectItem key={bankAccount.key}>
                          {bankAccount.label}
                        </SelectItem>
                      ))}
                    </Select>
                  )}
                />
                <CreateBankAccountButton
                  className={'aspect-square size-9 justify-center p-0'}
                  variant={'primary'}
                />
              </div>
              <div className={'flex gap-4'}>
                <Controller
                  name="categoryUuid"
                  control={control}
                  render={({ field }) => (
                    <Select
                      label={'category'}
                      placeholder={t('transactions.update.category')}
                      isInvalid={!!errors.categoryUuid?.message}
                      errorMessage={errors.categoryUuid?.message}
                      value={field.value}
                      onValueChangeAction={field.onChange}
                    >
                      {categoryOptions.map((category) => (
                        <SelectItem key={category.key}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </Select>
                  )}
                />
                <CreateCategoryButton
                  className={'aspect-square size-9 justify-center p-0'}
                  variant={'primary'}
                />
              </div>
              <Input
                {...register('description')}
                errorMessage={errors.description?.message}
                placeholder={t('transactions.update.description')}
                setFocus={handleSetFocus}
              />
            </ModalBody>
            <ModalFooter className={'flex justify-center p-0'}>
              <Button type={'submit'}>
                <Translate value={'transactions.update.update'} />
              </Button>
            </ModalFooter>
          </form>
        </div>
      </ModalContent>
    </Modal>
  )
}

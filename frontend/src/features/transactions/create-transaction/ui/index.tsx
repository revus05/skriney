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
import { useDisclosure } from '@heroui/react'
import {
  CreateTransactionFormData,
  useCreateTransactionForm,
  useCreateTransactionSubmit,
} from '../model'
import { Controller } from 'react-hook-form'
import { CurrencySymbols } from 'shared/constants/currencies'
import { useTranslation } from 'shared/i18n'
import { useGetBankAccounts } from 'entities/bank-account'
import { useGetCategories } from 'entities/category'
import { CreateBankAccountButton } from 'features/bank-accounts/create-bank-account'
import { CreateCategoryButton } from 'features/categories/create-category'
import { useEffect } from 'react'

export const CreateTransactionButton = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setFocus,
    setValue,
  } = useCreateTransactionForm()

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

  const t = useTranslation()

  const handleOpenChange = () => {
    onOpenChange()
    reset()
  }

  const { onSubmit, isLoading } = useCreateTransactionSubmit(handleOpenChange)
  const handleSetFocus = (name: string) =>
    setFocus(name as keyof CreateTransactionFormData)

  useEffect(() => {
    if (bankAccountsData && bankAccountsData.length === 1 && isOpen) {
      setValue('bankAccountUuid', bankAccountsData[0].uuid, {
        shouldValidate: true,
      })
    }
  }, [bankAccountsData, isOpen, setValue])

  useEffect(() => {
    if (categoriesData && categoriesData.length === 1 && isOpen) {
      setValue('categoryUuid', categoriesData[0].uuid, { shouldValidate: true })
    }
  }, [categoriesData, isOpen, setValue])

  useEffect(() => {
    if (isOpen) setFocus('amount')
  }, [isOpen, setFocus])

  return (
    <>
      <Button onClick={onOpen} variant={'icon'} iconStart={'plus'} />
      <Modal isOpen={isOpen} onOpenChange={handleOpenChange} hideCloseButton>
        <ModalContent
          className={'bg-bg-neutral-tertiary w-[380px] rounded-3xl border p-4'}
        >
          <div className={'flex flex-col gap-4'}>
            <ModalHeader className="flex items-center justify-between gap-1 p-0">
              <h2>
                <Translate value={'transactions.creation.sectionTitle'} />
              </h2>
              <Button
                variant="icon"
                iconStart={'x'}
                onClick={handleOpenChange}
              />
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
                      placeholder={t('transactions.creation.amount')}
                      setFocus={handleSetFocus}
                    />
                  </div>
                  <Controller
                    name="currency"
                    control={control}
                    render={({ field }) => (
                      <Select
                        label={'currency'}
                        placeholder={t('transactions.creation.currency')}
                        isInvalid={!!errors.currency?.message}
                        errorMessage={errors.currency?.message}
                        value={field.value}
                        onValueChangeAction={field.onChange}
                        className={'w-[128px]'}
                      >
                        {Object.entries(CurrencySymbols).map(
                          ([key, symbol]) => (
                            <SelectItem key={key}>
                              {symbol === key ? key : `${symbol} ${key}`}
                            </SelectItem>
                          ),
                        )}
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
                        placeholder={t('transactions.creation.bankAccount')}
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
                        placeholder={t('transactions.creation.category')}
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
                  placeholder={t('transactions.creation.description')}
                  setFocus={handleSetFocus}
                />
              </ModalBody>
              <ModalFooter className={'flex justify-center p-0'}>
                <Button type={'submit'} loading={isLoading}>
                  <Translate value={'transactions.creation.create'} />
                </Button>
              </ModalFooter>
            </form>
          </div>
        </ModalContent>
      </Modal>
    </>
  )
}

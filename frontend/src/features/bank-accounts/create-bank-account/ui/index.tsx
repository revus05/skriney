'use client'

import {
  Button,
  Input,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Select,
  SelectItem,
  Translate,
} from 'shared/ui'
import {
  CreateBankAccountFormData,
  useCreateBankAccountForm,
  useCreateBankAccountSubmit,
} from '../model'
import { CurrencySymbols } from 'shared/constants/currencies'
import { Controller } from 'react-hook-form'
import { useTranslation } from 'shared/i18n'
import { Modal } from 'shared/ui'
import { useDisclosure } from '@heroui/react'
import { FC, useEffect } from 'react'

type CreateBankAccountButtonProps = {
  className?: string
  variant?: 'primary' | 'icon'
}

export const CreateBankAccountButton: FC<CreateBankAccountButtonProps> = ({
  variant = 'icon',
  className,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
    setFocus,
  } = useCreateBankAccountForm()

  const handleOpenChange = () => {
    onOpenChange()
    reset()
  }

  const { onSubmit, isLoading } = useCreateBankAccountSubmit(handleOpenChange)

  const t = useTranslation()

  const handleSetFocus = (name: string) =>
    setFocus(name as keyof CreateBankAccountFormData)

  useEffect(() => {
    if (isOpen) setFocus('title')
  }, [isOpen, setFocus])

  return (
    <>
      <Button
        onClick={onOpen}
        variant={variant}
        iconStart={'plus'}
        className={className}
      />
      <Modal isOpen={isOpen} onOpenChange={handleOpenChange} hideCloseButton>
        <ModalContent
          className={'bg-bg-neutral-tertiary w-85 rounded-3xl border p-4'}
        >
          <div className={'flex flex-col gap-4'}>
            <ModalHeader className="flex items-center justify-between gap-1 p-0">
              <h2>
                <Translate value={'bankAccounts.creation.sectionTitle'} />
              </h2>
              <Button
                variant="icon"
                iconStart={'x'}
                onClick={handleOpenChange}
              />
            </ModalHeader>
            <form
              onSubmit={(e) => {
                e.stopPropagation()
                handleSubmit(onSubmit)(e)
              }}
              className={'flex flex-col gap-4'}
            >
              <ModalBody className={'p-0'}>
                <Input
                  {...register('title')}
                  errorMessage={errors.title?.message}
                  placeholder={t('bankAccounts.creation.title')}
                  setFocus={handleSetFocus}
                />
                <div className={'flex items-start gap-4'}>
                  <div className={'grow'}>
                    <Input
                      {...register('initialBalance')}
                      errorMessage={errors.initialBalance?.message}
                      placeholder={t('bankAccounts.creation.initialBalance')}
                      setFocus={handleSetFocus}
                    />
                  </div>
                  <Controller
                    name="currency"
                    control={control}
                    render={({ field }) => (
                      <Select
                        label={'currency'}
                        placeholder={t('bankAccounts.creation.currency')}
                        className={'w-32'}
                        isInvalid={!!errors.currency?.message}
                        errorMessage={errors.currency?.message}
                        value={field.value}
                        onValueChangeAction={field.onChange}
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
              </ModalBody>
              <ModalFooter className={'flex justify-center p-0'}>
                <Button type={'submit'} loading={isLoading}>
                  <Translate value={'bankAccounts.creation.create'} />
                </Button>
              </ModalFooter>
            </form>
          </div>
        </ModalContent>
      </Modal>
    </>
  )
}

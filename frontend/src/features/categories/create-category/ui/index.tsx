'use client'

import { Button, Input, Translate } from 'shared/ui'
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@heroui/react'
import {
  CreateCategoryFormData,
  useCreateCategoryForm,
  useCreateCategorySubmit,
} from '../model'
import { useTranslation } from 'shared/i18n'
import { FC, useEffect } from 'react'

type CreateCategoryButtonProps = {
  className?: string
  variant?: 'primary' | 'ghost' | 'icon'
}

export const CreateCategoryButton: FC<CreateCategoryButtonProps> = ({
  className,
  variant = 'icon',
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setFocus,
  } = useCreateCategoryForm()

  const handleOpenChange = () => {
    onOpenChange()
    reset()
  }

  const { onSubmit, isLoading } = useCreateCategorySubmit(handleOpenChange)

  const t = useTranslation()

  const handleSetFocus = (name: string) =>
    setFocus(name as keyof CreateCategoryFormData)

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
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} hideCloseButton>
        <ModalContent
          className={'bg-bg-neutral-tertiary w-[340px] rounded-3xl border p-4'}
        >
          <div className={'flex flex-col gap-4'}>
            <ModalHeader className="flex items-center justify-between gap-1 p-0">
              <h2>
                <Translate value={'categories.creation.sectionTitle'} />
              </h2>
              <Button variant="icon" iconStart={'x'} onClick={onOpenChange} />
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
                  placeholder={t('categories.creation.title')}
                  setFocus={handleSetFocus}
                />
              </ModalBody>
              <ModalFooter className={'flex justify-center p-0'}>
                <Button type={'submit'} loading={isLoading}>
                  <Translate value={'categories.creation.create'} />
                </Button>
              </ModalFooter>
            </form>
          </div>
        </ModalContent>
      </Modal>
    </>
  )
}

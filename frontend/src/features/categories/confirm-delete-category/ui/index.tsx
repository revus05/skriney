'use client'

import { Button, Modal, ModalContent, ModalHeader, Translate } from 'shared/ui'
import React, { FC } from 'react'

type ConfirmCategoryDeleteModalProps = {
  open: boolean
  openChangedAction: (value: boolean) => void
  onSubmitAction: () => void
}

export const ConfirmDeleteCategoryModal: FC<
  ConfirmCategoryDeleteModalProps
> = ({ open, openChangedAction, onSubmitAction }) => {
  const handleSubmit = () => {
    openChangedAction(false)
    onSubmitAction()
  }

  return (
    <Modal isOpen={open} onOpenChange={openChangedAction} hideCloseButton>
      <ModalContent
        className={'bg-bg-neutral-tertiary w-[300px] rounded-3xl border p-4'}
      >
        <div className={'flex flex-col gap-4'}>
          <ModalHeader className="flex items-center justify-between gap-1 p-0">
            <h2>
              <Translate value={'categories.confirmDelete.title'} />
            </h2>
            <Button
              variant="icon"
              iconStart={'x'}
              onClick={() => openChangedAction(false)}
            />
          </ModalHeader>
          <div className={'mx-auto flex gap-4'}>
            <Button onClick={() => openChangedAction(false)}>
              <Translate value={'categories.confirmDelete.cancel'} />
            </Button>
            <Button onClick={handleSubmit} variant={'danger'}>
              <Translate value={'categories.confirmDelete.delete'} />
            </Button>
          </div>
        </div>
      </ModalContent>
    </Modal>
  )
}

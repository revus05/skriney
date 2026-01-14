import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@heroui/react'
import { Button, Icons, Translate, UserImage } from 'shared/ui'
import React, { createElement, useRef, useState } from 'react'
import { addToast } from '@heroui/toast'
import { cn, useAppSelector } from 'shared/lib'
import { useUpdateUserImage } from '../model'

export const UpdatableUserImage = () => {
  const [isDragging, setIsDragging] = useState(false)
  const { isOpen, onOpenChange } = useDisclosure()

  const user = useAppSelector((state) => state.userSlice.user)

  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const updateUserImage = useUpdateUserImage()

  const handleFileUpload = async (files: FileList | null) => {
    if (!files) return

    const file = files[0]
    if (!file.type.startsWith('image/')) {
      addToast({
        title: 'Можно загружать только изображения',
        classNames: {
          base: 'bg-bg-neutral-tertiary/70 rounded-3xl border px-6 py-4 backdrop-blur-[32px]',
          title: 'text-text-semantic-error-primary font-bold',
          icon: 'fill-icon-semantic-error-primary font-bold',
        },
        icon: createElement(Icons.warning),
      })
      console.warn()
      return
    }

    await updateUserImage(files[0])
    onOpenChange()
  }

  return (
    <>
      <UserImage
        image={user?.image}
        userColor={user?.color}
        username={user?.username}
        onClick={onOpenChange}
        className={'[&_span]:group-hover:opacity-0'}
        editing
        size={120}
      />
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} hideCloseButton>
        <ModalContent
          className={'bg-bg-neutral-tertiary rounded-3xl border p-4'}
        >
          {(onClose) => {
            return (
              <div className={'flex flex-col gap-4'}>
                <ModalHeader className="flex items-center justify-between gap-1 p-0">
                  <h2>
                    <Translate value={'profile.updateImage.sectionTitle'} />
                  </h2>
                  <Button variant="icon" iconStart={'x'} onClick={onClose} />
                </ModalHeader>
                <form className={'flex flex-col gap-4'}>
                  <ModalBody className={'p-0'}>
                    <input
                      type="file"
                      accept="image/*"
                      ref={fileInputRef}
                      className="hidden"
                      onChange={(e) => handleFileUpload(e.target.files)}
                    />
                    <div
                      onDrop={(e) => {
                        e.preventDefault()
                        void handleFileUpload(e.dataTransfer.files)
                      }}
                      onDragOver={(e) => e.preventDefault()}
                      onDragEnter={() => setIsDragging(true)}
                      onDragLeave={() => setIsDragging(false)}
                      className={cn(
                        'flex h-64 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed',
                        isDragging && 'bg-bg-neutral-secondary',
                      )}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <span>
                        {isDragging ? (
                          <Translate
                            value={'profile.updateImage.releaseHere'}
                          />
                        ) : (
                          <Translate value={'profile.updateImage.dragHere'} />
                        )}
                      </span>
                    </div>
                  </ModalBody>
                  <ModalFooter className={'flex justify-center p-0'}>
                    <Button onClick={() => fileInputRef.current?.click()}>
                      <Translate value={'profile.updateImage.update'} />
                    </Button>
                  </ModalFooter>
                </form>
              </div>
            )
          }}
        </ModalContent>
      </Modal>
    </>
  )
}

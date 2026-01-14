'use client'

import { Balance, Button, Card, EmojiTitle, Translate, Trend } from 'shared/ui'
import { Popover, PopoverContent, PopoverTrigger } from '@heroui/react'
import {
  useDeleteBankAccount,
  useGetBankAccounts,
  useUpdateBankAccount,
} from 'entities/bank-account'
import {
  UpdateBankAccountModal,
  updateBankAccountModalOpenFn,
  updateBankAccountUuid,
} from 'features/bank-accounts/update-bank-account'
import { useAppDispatch } from 'shared/lib'
import { useState } from 'react'
import { ConfirmDeleteBankAccountModal } from 'features/bank-accounts/confirm-delete-bank-account'
import { Currency } from 'shared/constants/currencies'

export const BankAccountsList = () => {
  const dispatch = useAppDispatch()

  const [openPopoverUuid, setOpenPopoverUuid] = useState<string | null>(null)
  const [openBankAccountDeleteConfirm, setOpenBankAccountDeleteConfirm] =
    useState(false)
  const [deleteBankAccountUuid, setDeleteBankAccountUuid] = useState<
    string | null
  >(null)

  const bankAccounts = useGetBankAccounts()

  const deleteBankAccount = useDeleteBankAccount()
  const updateBankAccount = useUpdateBankAccount()

  const handleEditClicked = (uuid: string) => {
    dispatch(updateBankAccountModalOpenFn(true))
    dispatch(updateBankAccountUuid(uuid))
    setOpenPopoverUuid(null)
  }

  const handleDeleteClicked = (uuid: string) => {
    setOpenBankAccountDeleteConfirm(true)
    setDeleteBankAccountUuid(uuid)
    setOpenPopoverUuid(null)
  }

  return (
    <div className={'flex flex-wrap gap-4'}>
      {bankAccounts.map((bankAccount) => (
        <Card
          key={bankAccount.uuid}
          className={'relative flex flex-col gap-3 pr-12'}
        >
          <EmojiTitle
            title={bankAccount.title}
            emoji={bankAccount.emoji}
            onEmojiChange={(emoji) =>
              updateBankAccount(bankAccount.uuid, { emoji })
            }
            onTitleChange={(title) =>
              updateBankAccount(bankAccount.uuid, { title })
            }
          />
          <div className={'flex items-center gap-2.5'}>
            <Balance
              currencyBalances={bankAccount.currencyBalances}
              balanceInUsd={bankAccount.balanceInUsd}
              currency={Currency.USD}
            />
            {<Trend changePercent={0} />}
          </div>

          <Popover
            isOpen={openPopoverUuid === bankAccount.uuid}
            onOpenChange={(open) => {
              setOpenPopoverUuid(open ? bankAccount.uuid : null)
            }}
            placement="bottom-end"
          >
            <PopoverTrigger>
              <Button
                variant={'icon'}
                iconStart={'moreVertical'}
                className={'absolute top-3.5 right-3.5'}
                onClick={() => {
                  updateBankAccountUuid(bankAccount.uuid)
                }}
              />
            </PopoverTrigger>
            <PopoverContent
              className={
                'bg-bg-neutral-primary items-start rounded-2xl border p-1'
              }
            >
              <Button
                variant={'ghost'}
                iconStart={'edit'}
                onClick={() => handleEditClicked(bankAccount.uuid)}
                className={
                  'text-text-neutral-tertiary w-full rounded-xl px-3 py-2 font-bold'
                }
              >
                <Translate value={'bankAccounts.update.update'} />
              </Button>
              <Button
                variant={'ghost'}
                iconStart={'trashBin'}
                className={
                  '[&_svg]:fill-icon-semantic-error-primary text-text-semantic-error-primary w-full rounded-xl px-3 py-2 font-bold'
                }
                onClick={() => handleDeleteClicked(bankAccount.uuid)}
              >
                <Translate value={'bankAccounts.delete'} />
              </Button>
            </PopoverContent>
          </Popover>
        </Card>
      ))}

      <UpdateBankAccountModal />
      <ConfirmDeleteBankAccountModal
        open={openBankAccountDeleteConfirm}
        openChangedAction={setOpenBankAccountDeleteConfirm}
        onSubmitAction={() =>
          deleteBankAccountUuid &&
          deleteBankAccount({ uuid: deleteBankAccountUuid })
        }
      />
    </div>
  )
}

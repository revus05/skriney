'use client'

import { Balance, Button, Card, EmojiTitle, Loader, Translate } from 'shared/ui'
import { TransactionDTO } from 'shared/api'
import { Popover, PopoverContent, PopoverTrigger } from '@heroui/react'
import { useAppDispatch, useAppSelector } from 'shared/lib'
import { useDeleteTransaction, useGetTransactions } from 'entities/transaction'
import {
  UpdateTransactionModal,
  updateTransactionModalOpenFn,
  updateTransactionUuid,
} from 'features/transactions/update-transaction'
import { useState } from 'react'
import { ConfirmDeleteTransactionModal } from 'features/transactions/confirm-delete-transaction'
import { useGetBankAccounts } from 'entities/bank-account'
import { Currency } from 'shared/constants/currencies'

export const TransactionsList = () => {
  const dispatch = useAppDispatch()

  const language =
    useAppSelector((state) => state.userSlice.user?.userSettings?.language) ||
    'EN'
  const { transactions, isLoading } = useGetTransactions()
  const bankAccounts = useGetBankAccounts()

  const grouped = transactions.reduce<Record<string, TransactionDTO[]>>(
    (acc, tx) => {
      const dateKey = new Date(tx.createdAt).toLocaleDateString(
        `${language}-${language.toUpperCase()}`,
        {
          day: 'numeric',
          month: 'long',
        },
      )
      if (!acc[dateKey]) acc[dateKey] = []
      acc[dateKey].push(tx)
      return acc
    },
    {},
  )

  const [openPopoverUuid, setOpenPopoverUuid] = useState<string | null>(null)
  const [openTransactionDeleteConfirm, setOpenTransactionDeleteConfirm] =
    useState(false)
  const [deleteTransactionUuid, setDeleteTransactionUuid] = useState<
    string | null
  >(null)

  const deleteTransaction = useDeleteTransaction()

  const handleEditClicked = (uuid: string) => {
    dispatch(updateTransactionModalOpenFn(true))
    dispatch(updateTransactionUuid(uuid))
    setOpenPopoverUuid(null)
  }

  const handleDeleteClicked = (uuid: string) => {
    setOpenTransactionDeleteConfirm(true)
    setDeleteTransactionUuid(uuid)
    setOpenPopoverUuid(null)
  }

  const getBankAccount = (uuid: string) =>
    bankAccounts.find((bankAccount) => bankAccount.uuid === uuid)

  const getTodayCurrencyBalances = (txs: TransactionDTO[]) =>
    txs.reduce<Record<Currency, number>>(
      (currencyBalance, transaction) => {
        const currency = transaction.currency

        currencyBalance[currency] =
          Math.round(
            ((currencyBalance[currency] ?? 0) + transaction.amount) * 100,
          ) / 100

        return currencyBalance
      },
      {} as Record<Currency, number>,
    )

  const getTodayBalanceInUsd = (txs: TransactionDTO[]) =>
    txs.reduce(
      (currencyBalance, transaction) =>
        currencyBalance + transaction.amountInUsd,
      0,
    )

  if (isLoading) {
    return <Loader />
  }

  if (transactions.length === 0) {
    return (
      <span className={'text-center'}>
        <Translate value={'transactions.noTransactionsYet'} />
        <br />
        <Translate value={'transactions.howToCreateTransaction'} />
      </span>
    )
  }

  return (
    <Card className={'flex flex-col gap-4 rounded-2xl p-4'}>
      {Object.entries(grouped).map(([date, txs]) => (
        <div key={date} className="flex flex-col gap-1">
          <div className={'flex items-center gap-2.5 border-b pb-1 pl-2'}>
            <span className="text-base font-bold">{date}</span>
            <span className="text-text-neutral-tertiary text-base font-bold">
              •
            </span>
            <Balance
              currencyBalances={getTodayCurrencyBalances(txs)}
              balanceInUsd={getTodayBalanceInUsd(txs)}
              signed
              withColor
              withBackground
            />
          </div>
          <div className={'flex flex-col'}>
            {txs.map((tx) => (
              <div
                key={tx.uuid}
                className="hover:bg-bg-neutral-primary flex cursor-pointer items-center rounded-lg py-1 pr-1 pl-2"
              >
                <div className={'flex grow items-center gap-2'}>
                  {tx.category ? (
                    <EmojiTitle
                      title={tx.category.title}
                      emoji={tx.category.emoji ?? undefined}
                      className={'w-[20%] text-sm'}
                    />
                  ) : (
                    <span
                      className={
                        'text-text-neutral-tertiary w-[20%] text-xs font-bold'
                      }
                    >
                      <Translate value={'transactions.noCategory'} />
                    </span>
                  )}
                  <div className={'w-[20%]'}>
                    <Balance
                      balance={tx.amount}
                      currency={tx.currency}
                      signed
                      withColor
                    />
                  </div>
                  {tx.bankAccountUuid ? (
                    <EmojiTitle
                      title={getBankAccount(tx.bankAccountUuid)?.title || ''}
                      emoji={getBankAccount(tx.bankAccountUuid)?.emoji}
                      className={'w-[30%] text-sm'}
                    />
                  ) : (
                    <span
                      className={
                        'text-text-neutral-tertiary w-[30%] text-xs font-bold'
                      }
                    >
                      <Translate value={'transactions.noBankAccount'} />
                    </span>
                  )}

                  <span
                    className={'text-text-neutral-primary text-sm font-bold'}
                  >
                    {tx.description}
                  </span>
                </div>
                <Popover
                  placement="bottom-end"
                  isOpen={openPopoverUuid === tx.uuid}
                  onOpenChange={(open) => {
                    setOpenPopoverUuid(open ? tx.uuid : null)
                  }}
                >
                  <PopoverTrigger>
                    <Button variant="icon" iconStart="moreVertical" />
                  </PopoverTrigger>
                  <PopoverContent
                    className={'bg-bg-neutral-primary rounded-2xl border p-1'}
                  >
                    <div className="flex flex-col items-center">
                      <Button
                        variant={'ghost'}
                        iconStart={'edit'}
                        className={
                          'text-text-neutral-tertiary w-full rounded-xl px-3 py-2 font-bold'
                        }
                        onClick={() => handleEditClicked(tx.uuid)}
                      >
                        <Translate value={'transactions.update.update'} />
                      </Button>
                      <Button
                        variant={'ghost'}
                        iconStart={'trashBin'}
                        className={
                          '[&_svg]:fill-icon-semantic-error-primary text-text-semantic-error-primary w-full rounded-xl px-3 py-2 font-bold'
                        }
                        onClick={() => handleDeleteClicked(tx.uuid)}
                      >
                        <Translate value={'transactions.delete'} />
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            ))}
          </div>
        </div>
      ))}

      <UpdateTransactionModal />
      <ConfirmDeleteTransactionModal
        open={openTransactionDeleteConfirm}
        openChangedAction={setOpenTransactionDeleteConfirm}
        onSubmitAction={() =>
          deleteTransactionUuid &&
          deleteTransaction({ uuid: deleteTransactionUuid })
        }
      />
    </Card>
  )
}

import { formatCurrency } from 'shared/lib'
import type { CreateTransactionResponse } from 'shared/proto/transaction.ts'

export const getCreateTransactionReply = (
  createTransactionResponse: CreateTransactionResponse,
) =>
  `Транзакция успешно создана✅\n
Сумма: ${createTransactionResponse.amount} ${formatCurrency(createTransactionResponse.currency)}
Категория: ${createTransactionResponse.categoryEmoji ? createTransactionResponse.categoryEmoji : ''} ${createTransactionResponse.categoryTitle ? createTransactionResponse.categoryTitle : '<Нет>'}
Счет:${createTransactionResponse.bankAccountEmoji ? createTransactionResponse.bankAccountEmoji : ''} ${createTransactionResponse.bankAccountTitle}

Итоговый баланс счета: ${createTransactionResponse.bankAccountBalanceInUsd} $`

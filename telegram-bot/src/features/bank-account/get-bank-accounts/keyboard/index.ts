import { InlineKeyboard } from 'grammy'
import { getBankAccounts } from '../model'
import type { BankAccount } from 'shared/proto'

export const getBankAccountKeyboard = async (telegramId: number) => {
  const getBankAccountsResponse = await getBankAccounts({
    telegramId,
  })

  if (!getBankAccountsResponse.status) {
    return new InlineKeyboard()
  }

  const bankAccountsKeyboard = new InlineKeyboard()

  getBankAccountsResponse.bankAccounts.forEach((bankAccount: BankAccount) => {
    bankAccountsKeyboard
      .text(`${bankAccount.emoji} ${bankAccount.title}`, bankAccount.uuid)
      .row()
  })

  return bankAccountsKeyboard
}

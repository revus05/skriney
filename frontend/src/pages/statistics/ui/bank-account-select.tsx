'use client'

import { Select, SelectItem, Translate } from 'shared/ui'
import { useTranslation } from 'shared/i18n'
import { useAppDispatch, useAppSelector } from 'shared/lib'
import { setBankAccountUuid } from 'entities/balance/model'
import { useGetBankAccounts } from 'entities/bank-account'
import { BankAccountDTO } from 'shared/api'

const SELECT_ALL = 'ALL'

export const BalanceBankAccountSelect = () => {
  const t = useTranslation()

  const dispatch = useAppDispatch()

  const bankAccounts = useGetBankAccounts()

  const selectedBankAccount = useAppSelector(
    (state) => state.balanceSlice.bankAccountUuid,
  )

  const handleBankAccountUuidChange = (uuid: string) => {
    dispatch(setBankAccountUuid(uuid === SELECT_ALL ? null : uuid))
  }

  const renderBankAccountTitle = (bankAccount: BankAccountDTO) =>
    bankAccount.emoji
      ? `${bankAccount.emoji} ${bankAccount.title}`
      : bankAccount.title

  return (
    <Select
      label={'balanceBankAccount'}
      className={'w-[150px]'}
      placeholder={t('statistics.bankAccount.title')}
      value={selectedBankAccount || SELECT_ALL}
      onValueChangeAction={handleBankAccountUuidChange}
    >
      <>
        <SelectItem
          key={SELECT_ALL}
          textValue={t('statistics.bankAccount.all')}
        >
          <Translate value={'statistics.bankAccount.all'} />
        </SelectItem>
        {bankAccounts.map((bankAccount) => (
          <SelectItem
            key={bankAccount.uuid}
            textValue={renderBankAccountTitle(bankAccount)}
          >
            {renderBankAccountTitle(bankAccount)}
          </SelectItem>
        ))}
      </>
    </Select>
  )
}

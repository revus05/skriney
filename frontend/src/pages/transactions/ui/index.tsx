import { Icons, Translate } from 'shared/ui'
import { withHomeLayout } from 'widgets/layouts/home'
import { CreateTransactionButton } from 'features/transactions/create-transaction'
import { TransactionsList } from './list'

const TransactionsPage = () => {
  return (
    <div className={'flex w-full justify-center'}>
      <div className={'flex w-224.5 flex-col gap-6'}>
        <div className={'flex items-center justify-between'}>
          <div className={'flex items-center gap-2.5'}>
            <h2 className={'text-[32px] leading-8 font-bold'}>
              <Translate value={'transactions.title'} />
            </h2>
            <Icons.info />
          </div>
          <CreateTransactionButton />
        </div>
        <TransactionsList />
      </div>
    </div>
  )
}

export default withHomeLayout(TransactionsPage)

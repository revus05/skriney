import { Icons, Translate } from 'shared/ui'
import { withHomeLayout } from 'widgets/layouts/home'
import { CreateBankAccountButton } from 'features/bank-accounts/create-bank-account'
import { BankAccountsList } from 'widgets/bank-accounts/list'

const BankAccountsPage = () => (
  <div className={'flex w-full justify-center'}>
    <div className={'flex w-140 flex-col gap-6'}>
      <div className={'flex items-center justify-between'}>
        <div className={'flex items-center gap-2.5'}>
          <h2 className={'text-[32px] leading-8 font-bold'}>
            <Translate value={'bankAccounts.title'} />
          </h2>
          <Icons.info />
        </div>
        <CreateBankAccountButton />
      </div>
      <BankAccountsList />
    </div>
  </div>
)

export default withHomeLayout(BankAccountsPage)

import { withHomeLayout } from 'widgets/layouts/home'
import { Balances } from 'pages/statistics/ui/balances'
import { Translate } from 'shared/ui'
import { PeriodSelect } from './period-select'
import { BalanceBankAccountSelect } from 'pages/statistics/ui/bank-account-select'
import { CategoriesPieChart } from 'pages/statistics/ui/categories'

const StatisticsPage = () => {
  return (
    <div className={'flex w-full justify-center'}>
      <div className={'flex w-245 flex-col gap-6'}>
        <div className={'flex items-center justify-between gap-2.5'}>
          <h2 className={'text-[32px] leading-8 font-bold'}>
            <Translate value={'statistics.title'} />
          </h2>
          <div className={'flex gap-2.5'}>
            <PeriodSelect />
            <BalanceBankAccountSelect />
          </div>
        </div>
        <Balances />
        <CategoriesPieChart />
      </div>
    </div>
  )
}

export default withHomeLayout(StatisticsPage)

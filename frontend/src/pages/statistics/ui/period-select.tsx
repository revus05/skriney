'use client'

import { Select, SelectItem, Translate } from 'shared/ui'
import { useTranslation } from 'shared/i18n'
import { BalancePeriod } from 'shared/constants/balancePeriod'
import { useAppDispatch, useAppSelector } from 'shared/lib'
import { setBalancePeriod } from 'entities/balance/model'

export const PeriodSelect = () => {
  const t = useTranslation()

  const dispatch = useAppDispatch()

  const period = useAppSelector((state) => state.balanceSlice.period)

  const handlePeriodChange = (period: BalancePeriod) => {
    dispatch(setBalancePeriod(period))
  }

  return (
    <Select
      label={'period'}
      className={'w-[150px]'}
      placeholder={t('statistics.period.title')}
      value={period}
      onValueChangeAction={handlePeriodChange}
      renderValue={(items) =>
        items.map((item) => (
          <Translate
            key={item.key}
            value={`statistics.period.${String(item.key)}`}
          />
        ))
      }
    >
      {Object.keys(BalancePeriod).map((period) => (
        <SelectItem key={period} textValue={t(`statistics.period.${period}`)}>
          <Translate value={`statistics.period.${period}`} />
        </SelectItem>
      ))}
    </Select>
  )
}

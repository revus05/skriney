import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { BalanceSummaryDTO, DailyBalanceDTO } from 'shared/api'
import { BalancePeriod } from 'shared/constants/balancePeriod'

type InitialState = {
  dailyBalances: DailyBalanceDTO[]
  summary: BalanceSummaryDTO | null
  period: BalancePeriod
  bankAccountUuid: string | null
}

const initialState: InitialState = {
  dailyBalances: [],
  summary: null,
  period: BalancePeriod.LAST_30_DAYS,
  bankAccountUuid: null,
}

const balanceSlice = createSlice({
  name: 'balanceSlice',
  initialState,
  reducers: {
    setDailyBalances: (state, action: PayloadAction<DailyBalanceDTO[]>) => {
      state.dailyBalances = action.payload
    },
    setBalanceSummary: (state, action: PayloadAction<BalanceSummaryDTO>) => {
      state.summary = action.payload
    },
    setBalancePeriod: (state, action: PayloadAction<BalancePeriod>) => {
      state.period = action.payload
    },
    setBankAccountUuid: (state, action: PayloadAction<string | null>) => {
      state.bankAccountUuid = action.payload
    },
  },
})

export const {
  setDailyBalances,
  setBalanceSummary,
  setBalancePeriod,
  setBankAccountUuid,
} = balanceSlice.actions
export default balanceSlice.reducer

'use client'

import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'shared/lib'
import { useGetBalanceSummaryMutation } from '../api'
import { setBalanceSummary } from '../model'

export const useGetBalanceSummary = () => {
  const [getBalanceSummary] = useGetBalanceSummaryMutation()
  const dispatch = useAppDispatch()
  const balanceSummary = useAppSelector((state) => state.balanceSlice.summary)

  useEffect(() => {
    const fetchBalanceSummary = async () => {
      const response = await getBalanceSummary().unwrap()
      dispatch(setBalanceSummary(response.data))
    }

    void fetchBalanceSummary()
  }, [dispatch, getBalanceSummary])

  return balanceSummary
}

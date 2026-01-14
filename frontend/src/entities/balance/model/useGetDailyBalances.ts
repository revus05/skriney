'use client'

import { useEffect, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'shared/lib'
import { useGetDailyBalancesMutation } from '../api'
import { setDailyBalances } from '../model'

export const useGetDailyBalances = () => {
  const [getDailyBalances, { isLoading: rawIsLoading }] =
    useGetDailyBalancesMutation()
  const dispatch = useAppDispatch()

  const dailyBalances = useAppSelector(
    (state) => state.balanceSlice.dailyBalances,
  )
  const period = useAppSelector((state) => state.balanceSlice.period)
  const bankAccountUuid = useAppSelector(
    (state) => state.balanceSlice.bankAccountUuid,
  )

  const [isLoading, setIsLoading] = useState(false)
  const showTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const hideImmediately = useRef(false)

  useEffect(() => {
    if (rawIsLoading) {
      hideImmediately.current = false

      showTimeoutRef.current = setTimeout(() => {
        if (rawIsLoading) {
          setIsLoading(true)
        }
      }, 40)
    } else {
      if (showTimeoutRef.current) {
        clearTimeout(showTimeoutRef.current)
        showTimeoutRef.current = null
      }

      setIsLoading(false)
    }

    return () => {
      if (showTimeoutRef.current) {
        clearTimeout(showTimeoutRef.current)
      }
    }
  }, [rawIsLoading])

  useEffect(() => {
    const fetchDailyBalances = async () => {
      try {
        const response = await getDailyBalances({
          period,
          bankAccountUuid: bankAccountUuid || undefined,
        }).unwrap()
        dispatch(setDailyBalances(response.data))
      } catch (error) {
        console.error('Failed to fetch daily balances:', error)
      }
    }

    void fetchDailyBalances()
  }, [bankAccountUuid, dispatch, getDailyBalances, period])

  return { dailyBalances, isLoading }
}

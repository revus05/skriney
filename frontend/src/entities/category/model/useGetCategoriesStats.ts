'use client'

import { useGetCategoriesStatsMutation } from '../api'
import { setCategoriesStats } from '../model'
import { useEffect, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'shared/lib'

export const useGetCategoriesStats = () => {
  const [getCategoriesStats, { isLoading: rawIsLoading }] =
    useGetCategoriesStatsMutation()
  const dispatch = useAppDispatch()
  const categoriesStats = useAppSelector((state) => state.categorySlice.stats)
  const period = useAppSelector((state) => state.balanceSlice.period)
  const bankAccountUuid = useAppSelector(
    (state) => state.balanceSlice.bankAccountUuid,
  )

  useEffect(() => {
    const fetchCategoriesStats = async () => {
      const response = await getCategoriesStats({
        period,
        bankAccountUuid: bankAccountUuid || undefined,
      }).unwrap()
      dispatch(setCategoriesStats(response.data))
    }

    void fetchCategoriesStats()
  }, [bankAccountUuid, dispatch, getCategoriesStats, period])

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

  return { categoriesStats, isLoading }
}
